import { CSSProps, OptionsProps, CACHE_TYPE } from './types';

export const uid = (input: string) => {
    var hash = 0, i, chr, len;
    for (i = 0, len = input.length; i < len; i++) {
        chr = input.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash
}


export const CSS_CACHE = new Map<string, CACHE_TYPE>();

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

export const formatValue = (prop: string, val: any): string => {
    return typeof val === 'number' && !number_val_props.includes(prop) ? `${val}px` : val
}

export const makeCacheKey = <P = {}>(_css: CSSProps<P>, options?: OptionsProps) => {
    return (options?.cachePrefix || "") + JSON.stringify(_css)
}