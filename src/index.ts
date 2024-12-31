import { style } from "./core";
import { CSSPropsRoot, OptionsProps } from "./types";

export const css = <P = {}>(_css: CSSPropsRoot<P>, options?: OptionsProps): any => style(_css, undefined, options)

export const alpha = (color: string, opacity: number) => {
    opacity = opacity * 100;
    return `color-mix(in srgb, ${color} ${opacity}%, transparent)`
}

type classNamesTypes = string | Record<string, boolean> | classNamesTypes[] | undefined | null | false;
export const classNames = (...args: classNamesTypes[]): string => {
    return args
        .flatMap(item => {
            if (!item) return [];
            if (typeof item === 'string') return item;
            if (Array.isArray(item)) return classNames(...item);
            if (typeof item === 'object') return Object.keys(item).filter(key => item[key]);
            return [];
        })
        .join(' ');
};


let _css = {
    // padding: "10px",
    // margin: "20px",
    // animationName: "fade",
    // "@keyframes fade": {
    //     from: {
    //         color: "red"
    //     },
    //     to: {
    //         color: "green"
    //     }
    // },
    // "@global": {
    //     "body": {
    //         margin: "0px",
    //         padding: "0px"
    //     }
    // },
    // color: {
    //     500: "red",
    //     700: "blue",
    //     900: "green",
    // },
    "& button": {
        background: {
            500: "red",
            700: "blue",
            900: "green",
        }
    }
}

// const m = style(_css, undefined, {
//     getProps: (prop, val, css) => {

//     }
// })
// console.log(m.css);
