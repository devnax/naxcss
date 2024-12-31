import { OptionsProps, CSSFactoryType, CSSPropsRoot } from './types';

const _global: any = typeof window !== 'undefined' ? window : global;
_global.Factory = _global.Factory || new Map<string, CSSFactoryType>();
export const CSSFactory = _global.Factory as Map<string, CSSFactoryType>

export const uid = (str: string) => {
    var hash = 0, len = str.length;
    for (var i = 0; i < len; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0;
    }
    let id = hash.toString(32).slice(-10).replaceAll("-", "");
    if (/^\d/.test(id.charAt(0))) id = 'c' + id;
    return id;
}

const number_val_props = [
    "fontWeight",
    "font-weight",
    "lineHeight",
    "line-height",
    "opacity",
    "zIndex",
    "z-index",
    "flex",
    "order",
    "flexGrow",
    "flex-grow",
    "flexShrink",
    "flex-shrink",
    "flexBasis",
    "flex-basis",
    "columns",
    "perspective",
    "stroke-dashoffset"
]

export const formatProp = (prop: string) => prop.split(/(?=[A-Z])/).join("-").toLowerCase();
export const formatValue = (prop: string, val: any) => typeof val === 'number' && !number_val_props.includes(prop) ? `${val}px` : val

const PREFIXES = ['webkit', 'moz', 'ms', 'o'];
let _declaration: CSSStyleDeclaration;
const PREFIXCACHE = new Map();

export const cssPrefix = (prop: string, value: string): { prop: string, value: string } => {
    value = formatValue(prop, value);
    prop = formatProp(prop);

    if (typeof window === 'undefined') {
        return { prop, value };
    }

    const declaration = _declaration || (_declaration = document.createElement("div").style);
    value = value?.toString();

    // Check if the property and value work as is
    if (declaration.setProperty(prop, value), declaration.getPropertyValue(prop) === value) {
        return { prop, value };
    }

    // Check cached property and value prefix
    const cached = PREFIXCACHE.get(prop);
    if (cached) {
        return { prop: cached._prop, value: `${cached._vprefix}${value}` };
    }

    let _prop = prop;
    let _value = value;
    let _vprefix = '';

    // Try property prefixes
    const camelCaseProp = prop.includes('-') ? prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase()) : prop;
    for (const prefix of PREFIXES) {
        if (declaration[`${prefix}${camelCaseProp}` as any] !== undefined) {
            _prop = `-${prefix}-${prop}`;
            break;
        }
    }

    // Check if prefixed property works with the value
    declaration.setProperty(_prop, value);
    if (!declaration.getPropertyValue(_prop)) {
        for (const prefix of PREFIXES) {
            const prefixedValue = `-${prefix}-${value}`;
            if (declaration.setProperty(_prop, prefixedValue), declaration.getPropertyValue(_prop) === prefixedValue) {
                _value = prefixedValue;
                _vprefix = `-${prefix}-`;
                break;
            }
        }
    }

    PREFIXCACHE.set(prop, { _prop, _vprefix });
    return { prop: _prop, value: _value };
};

export const style = (_css: CSSPropsRoot<any>, cls?: string, opt?: OptionsProps) => {
    let cachekey
    let classname = cls
    if (!cls) {
        cachekey = JSON.stringify(_css)
        const has = CSSFactory.get(cachekey)
        if (has) {
            has.cache = true
            return has
        }
        classname = uid(cachekey)
    } else if (typeof cls !== 'string') {
        throw new Error(`Invalid class name: ${cls}`)
    }

    let stack: any = [`${classname}{`]
    let medias: any = {}

    for (let prop in _css) {
        let val = _css[prop]
        if (prop.startsWith("&")) {
            let ncls = prop.replaceAll("&", classname as string)
            stack = [
                ...stack,
                style(val, ncls, opt)
            ]
        } else if (prop.startsWith("@media")) {
            const mediacss = prop + "{" + style(val, classname, opt) + "}"
            stack.push(mediacss)
        } else if (prop.startsWith("@keyframes")) {
            let frams = ''
            for (let frame in val) {
                frams += style(val[frame], frame, opt)
            }
            stack.push(`${prop}{${frams}}`)
        } else if (prop.startsWith("@global")) {
            let frams = ''
            for (let frame in val) {
                frams += style(val[frame], frame, opt)
            }
            stack.push(frams)
        } else if (typeof val === 'object') {
            for (let media in val) {
                if (typeof val[media] === 'object' || typeof val[media] === 'function' || Array.isArray(val[media])) {
                    throw new Error(`Invalid css value: ${val[media]}`);
                }
                let breakpoint = media
                let isNumber = !isNaN(parseInt(breakpoint))
                if (!isNumber) {
                    if (opt?.breakpoints && !isNaN(parseInt((opt.breakpoints as any)[media]))) {
                        breakpoint = opt.breakpoints[media].toString()
                    } else {
                        throw new Error(`Invalid breakpoint prop: ${media}`);
                    }
                }
                let _css = { [prop]: val[media] }
                let _style = style(_css, classname, opt)
                let mediakey = `@media (min-width: ${breakpoint}px)`
                medias[mediakey] = medias[mediakey] ? medias[mediakey] + _style : _style
            }
        } else {
            if (opt?.skipProps && opt.skipProps(prop, val)) continue;
            if (opt?.getProps) {
                let _props: any = opt.getProps(prop, val, _css)
                if (_props) {
                    let s = style(_props, classname, {
                        ...opt,
                        getProps: undefined
                    })
                    stack.push(s)
                    continue;
                }
            }
            if (opt?.getValue) val = opt.getValue(prop, val, _css);
            const format = cssPrefix(prop, val)
            stack[0] += `${format.prop}:${format.value};`
        }
    }
    stack[0] += "}"
    stack = stack.join('')
    for (let media in medias) {
        stack += `${media}{${medias[media].replaceAll(`}${classname}{`, '')}}`
    }

    if (cachekey) {
        stack = stack.replaceAll(classname, "." + classname)
        const r = {
            cache: false,
            cachekey,
            classname: classname as string,
            css: stack,
            css_raw: _css,
            getStyleTag: () => document?.querySelector(`[data-naxcss="${classname}"]`) as HTMLStyleElement | null,
            deleteStyle: () => {
                const tag = document?.querySelector(`[data-naxcss="${classname}"]`)
                tag && tag.remove()
            },
            toString: () => classname as string
        }

        // inject style to head
        if (typeof window !== 'undefined' && classname) {
            if (document.querySelector(`[data-naxcss="${classname}"]`)) return;
            const tag = document.createElement("style");
            tag.innerHTML = r.css
            tag.setAttribute(`data-naxcss`, classname)
            document.head.append(tag)
        }
        CSSFactory.set(cachekey, r)
        return r
    }
    return stack
}