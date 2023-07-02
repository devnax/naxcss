import { CSSProps, OptionsProps, CACHE_TYPE } from './types';
import { NAXCSS_CACHE } from './core'


export const uid = (str: string) => {
    var hash = 0, len = str.length;
    for (var i = 0; i < len; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0;
    }
    return hash.toString(32).slice(-10);
}

/**
 * Js Prop to Css Prop -> fontSize to font-size
 * @param prop 
 * @returns string
 */
export const formatProp = (prop: string) => prop.split(/(?=[A-Z])/).join("-").toLowerCase();


/**
 * @param prop 
 * @param val 
 * @returns 
 */
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
    "flex-grow"
]

export const formatValue = (prop: string, val: any) => {
    return typeof val === 'number' && !number_val_props.includes(prop) ? `${val}px` : val
}

export const makeCacheKey = <P = {}>(_css: CSSProps<P>, options?: OptionsProps) => {
    return (options?.cachePrefix || "") + JSON.stringify(_css)
}

export const loadServerCache = (options?: OptionsProps) => {
    if (typeof window !== 'undefined' && (window as any).NAXCSS_CACHE_SERVER?.cache && Array.isArray((window as any).NAXCSS_CACHE_SERVER.cache)) {
        const ssr_css: CACHE_TYPE[] = (window as any).NAXCSS_CACHE_SERVER.cache
        ssr_css.forEach(c => NAXCSS_CACHE.set(makeCacheKey(c.css_raw, options), c))
        delete (window as any).NAXCSS_CACHE_SERVER;
    }
}