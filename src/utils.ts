import { CSSProps, OptionsProps } from './types';

export const uid = (str: string) => {
    var hash = 0, len = str.length;
    for (var i = 0; i < len; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0;
    }
    return hash.toString(32).slice(-10).replace("-", "");
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
