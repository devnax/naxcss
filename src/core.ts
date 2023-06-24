import { cssPrefix } from "./prefix"
import { formatValue, formatProp } from "./utils";
import { CSSProps, OptionsProps } from './types';
/**
 * this function formate css prop and value and also call alias, getValue, getProps
 * then return an object with prop key and valu string css
 * @param prop font-size or fontSize
 * @param value string or number
 * @param options 
 * @returns {fontSize: "font-size: 10px;", ...}
 */
export const formatCss = (js_prop: string, value: string | number, options?: OptionsProps) => {
    if (options?.getValue) {
        value = options.getValue(value, js_prop) || value
    }

    if (options?.getProps) {
        const props_ob: any = options.getProps(js_prop, value as any)
        if (props_ob && typeof props_ob == 'object') {
            let formated = {}
            for (let p_prop in props_ob) {
                let p_val = props_ob[p_prop]
                if (typeof p_val === 'string' || typeof p_val === "object") {
                    formated = {
                        ...formated,
                        ...formatCss(p_prop, p_val, { ...options, getProps: undefined })
                    }
                }
            }
            return formated
        }
    }


    if (options?.aliases) {
        const aliases: any = options.aliases
        const alias_cb = aliases[js_prop]
        const alias_ob = alias_cb && alias_cb(value)
        if (alias_ob) {
            let formated: any = {}
            for (let as_prop in alias_ob) {
                let val = alias_ob[as_prop]
                if (options?.getValue) {
                    val = options.getValue(val, as_prop) || val
                }
                val = formatValue(js_prop, val) // val could be number val

                const prefix = cssPrefix(as_prop, val)
                formated[prefix.prop] = `${prefix.prop}:${prefix.value};`
            }
            return formated
        }
    }
    value = formatValue(js_prop, value) // val could be number val
    let prop = formatProp(js_prop) // font-size
    const prefix = cssPrefix(prop, value)

    return {
        [prefix.prop]: `${prefix.prop}:${prefix.value};`
    }

}

const formateBreakPoints = (js_prop: string, value: { [key: string]: any }, options?: OptionsProps) => {
    if (typeof value === "object" && !Array.isArray(value) && options?.breakpoints) {
        const breakpoints = options.breakpoints
        const breakpointKeys = Object.keys(breakpoints)
        let formated_css: any = {} // {400: formatCss->string}

        for (let bp_name in value) {
            if (!breakpointKeys.includes(bp_name)) {
                throw new Error(`Invalid css value: ${value}`);
            }

            const breakpoint_num = breakpoints[bp_name]
            formated_css[breakpoint_num] = Object.values(formatCss(js_prop, value[bp_name], options)).join("")
        }

        return formated_css
    }
}

export const renderCss = <P = {}>(_css: CSSProps<P>, baseClass: string, options?: OptionsProps) => {
    if (typeof _css !== 'object') {
        throw new Error(`Invaid css object: ${_css}`);
    }

    let stack: any = []
    let medias: any = {} // {500: [], 800: []}
    let formated_css: any = {}

    for (let prop in _css as object) {
        const value = (_css as any)[prop]
        if (prop.startsWith("&")) {
            stack = [
                ...stack,
                ...renderCss(value, prop.replace('&', baseClass), options)
            ]
        } else {
            const media = formateBreakPoints(prop, value, options)
            if (media) {
                for (let brkpoin_num in media) {
                    if (!medias[brkpoin_num]) {
                        medias[brkpoin_num] = []
                    }
                    medias[brkpoin_num].push(`.${baseClass}{${media[brkpoin_num]}}`)
                }
            } else {
                formated_css = {
                    ...formated_css,
                    ...formatCss(prop, value, options)
                }
            }
        }

    }


    stack.push(`${baseClass ? "." + baseClass : ""}{${Object.values(formated_css).join("")}}`)

    const brkpoin_nums = Object.keys(medias).sort((a: any, b: any) => a - b).reverse();

    for (let bp_num of brkpoin_nums) {
        let media_css_items = medias[bp_num as any]
        stack.push(`@media screen and (min-width: ${bp_num}px){${media_css_items.join("")}}`)
    }

    return stack
}