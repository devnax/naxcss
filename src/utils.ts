import { CSSProps } from './types';

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
    "flex-grow",
    "stroke-dashoffset"
]

export const formatValue = (prop: string, val: any) => {
    return typeof val === 'number' && !number_val_props.includes(prop) ? `${val}px` : val
}

export const makeCacheKey = <P = {}>(_css: CSSProps<P>) => JSON.stringify(_css)
