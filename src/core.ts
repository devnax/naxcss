import { cssPrefix } from "./prefix"
import { formatValue, formatProp } from "./utils";
import { CSSProps, OptionsProps, CACHE_TYPE } from './types';

export const NAXCSS_CACHE = new Map<string, CACHE_TYPE>();


/**
 * this function formate css prop and value and also call alias, getValue, getProps
 * then return an object with prop key and valu string css
 * @param prop font-size or fontSize
 * @param value string or number
 * @param options 
 * @returns {fontSize: "font-size: 10px;", ...}
 */
export const formatCss = (js_prop: string, value: string | number, _css: CSSProps, options?: OptionsProps) => {
    if (options?.getValue) {
        value = options.getValue(value, js_prop, _css) || value
    }

    if (options?.getProps) {
        const props_ob: any = options.getProps(js_prop, value as any, _css)
        if (props_ob && typeof props_ob == 'object') {
            let formated = {}
            for (let p_prop in props_ob) {
                let p_val = props_ob[p_prop]
                if (typeof p_val === 'string' || typeof p_val === "object") {
                    formated = {
                        ...formated,
                        ...formatCss(p_prop, p_val, _css, { ...options, getProps: undefined })
                    }
                }
            }
            return formated
        }
    }


    if (options?.aliases) {
        const alias_cb = options.aliases[js_prop]
        const alias_ob = alias_cb && alias_cb(value)
        if (alias_ob) {
            let formated: any = {}
            for (let as_prop in alias_ob) {
                let val = alias_ob[as_prop]
                if (options?.getValue) {
                    val = options.getValue(val, as_prop, _css) || val
                }
                const prefix = cssPrefix(as_prop, formatValue(js_prop, val))
                formated[prefix.prop] = `${prefix.prop}:${prefix.value};`
            }
            return formated
        }
    }
    const prefix = cssPrefix(formatProp(js_prop), formatValue(js_prop, value))
    return {
        [prefix.prop]: `${prefix.prop}:${prefix.value};`
    }

}

const formateBreakPoints = (js_prop: string, value: { [key: string]: any }, _css: CSSProps, options?: OptionsProps) => {
    if (typeof value === "object" && !Array.isArray(value) && options?.breakpoints) {
        const breakpoints = options.breakpoints
        let formated_css: any = {} // {400: formatCss->string}
        for (let bp_name in value) {
            if (!Object.keys(breakpoints).includes(bp_name)) {
                throw new Error(`Invalid css value: ${value}`);
            }
            formated_css[breakpoints[bp_name]] = Object.values(formatCss(js_prop, value[bp_name], _css, options)).join("")
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

    for (let prop in _css as any) {
        let value = (_css as any)[prop]
        if (prop.startsWith("&")) {
            stack = [
                ...stack,
                ...renderCss(value, prop.replace('&', baseClass), options)
            ]
        } else {
            const media = formateBreakPoints(prop, value, _css as any, options)
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
                    ...formatCss(prop, value, _css as any, options)
                }
            }
        }
    }
    const values = Object.values(formated_css).join("")
    if (values) {
        stack.push(`${baseClass ? "." + baseClass : ""}{${Object.values(formated_css).join("")}}`)
    }

    const brkpoin_nums = Object.keys(medias).sort((a: any, b: any) => a - b).reverse();

    for (let bp_num of brkpoin_nums) {
        let media_css_items = medias[bp_num as any]
        stack.push(`@media screen and (min-width: ${bp_num}px){${media_css_items.join("")}}`)
    }

    return stack
}