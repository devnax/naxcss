import { CACHE_TYPE } from "./types";
import { renderCss, NAXCSS_CACHE } from "./core";
import { CSSProps, keyframesType, OptionsProps, GlobalCSSType } from "./types";
import { makeCacheKey, uid } from "./utils";
export * from './core'
export * from './types'
export * from './utils'

export const injectStyle = (_css: string, baseClass: string): HTMLStyleElement | void => {
    if (typeof window !== 'undefined' && window.document) {
        if (document.querySelector(`[data-naxcss="${baseClass}"]`)) return;
        const tag = document.createElement("style");
        tag.innerHTML = _css
        tag.setAttribute(`data-naxcss`, baseClass)
        document.head.append(tag)
        return tag
    }
}

export const css = <P = {}>(_css: CSSProps<P>, options?: OptionsProps): any => {
    let cache_key = makeCacheKey(_css);
    let _cache = NAXCSS_CACHE.get(cache_key)
    if (_cache) {
        return options?.return_css ? _cache : _cache.classname
    }

    const baseClass = (options?.classPrefix || "css-") + uid(cache_key)
    const rendered = renderCss(_css, baseClass, options).reverse()
    const cssstring = rendered.join('')
    NAXCSS_CACHE.set(cache_key, {
        classname: baseClass,
        css: cssstring,
        css_raw: _css
    })

    if (options?.return_css) {
        return NAXCSS_CACHE.get(cache_key)
    }
    if (rendered.length) {
        const st = injectStyle(cssstring, baseClass);
        (st && options?.getStyleTag) && options?.getStyleTag(st)
    }
    return baseClass
}


export const globalCss = <P>(key: string, _gcss: GlobalCSSType<P>, options?: OptionsProps): CACHE_TYPE | void => {
    let _cache: any = NAXCSS_CACHE.get(key)
    if (_cache) {
        return options?.return_css ? _cache : undefined;
    }
    let selectorType = options?.selectorType === "id" ? "#" : "."
    let cssstring = ""
    for (let key in _gcss) {
        cssstring += renderCss(_gcss[key], key, options).reverse().join('').replaceAll(selectorType + key, key)
    }
    NAXCSS_CACHE.set(key, {
        classname: key,
        css: cssstring,
        css_raw: _gcss
    })
    if (options?.return_css) {
        return NAXCSS_CACHE.get(key) as any
    }
    if (cssstring) {
        const st = injectStyle(cssstring, key);
        (st && options?.getStyleTag) && options?.getStyleTag(st)
    }
}

export const keyframes = (framesObject: keyframesType, options?: OptionsProps) => {
    const cache_key = makeCacheKey(framesObject)
    let _cache = NAXCSS_CACHE.get(cache_key)

    if (_cache) {
        return options?.return_css ? _cache : _cache.classname
    }
    let selectorType = options?.selectorType === "id" ? "#" : "."
    let frames = ""
    const baseClass = (options?.classPrefix || "css-") + uid(cache_key)
    for (let frameKey in framesObject) {
        const generated = renderCss(framesObject[frameKey], baseClass, options).reverse()
        frameKey = typeof frameKey === "number" ? frameKey + "%" : frameKey
        frames += `${frameKey}${generated[0].replace(selectorType + baseClass, '')}`
    }

    let _css = `@keyframes ${baseClass}{${frames}}`
    NAXCSS_CACHE.set(cache_key, {
        classname: baseClass,
        css: _css,
        css_raw: framesObject
    })
    if (options?.return_css) {
        return NAXCSS_CACHE.get(cache_key)
    }
    const st = injectStyle(_css, baseClass);
    (st && options?.getStyleTag) && options?.getStyleTag(st)
    return "name-" + baseClass
}


export const alpha = (color: string, opacity: number) => {
    opacity = opacity > 10 ? 10 : opacity;
    opacity = opacity < 0 ? 0 : opacity;
    opacity = opacity * 10;
    return `color-mix(in srgb, ${color} ${opacity}%, transparent)`
}

export type classNamesTypes = { [key: string]: boolean } | string | string[]
export const classNames = (...args: classNamesTypes[]) => {
    let clss = []
    for (let item of args) {
        if (!item) continue;
        if (typeof item === 'string') {
            clss.push(item)
        } else if (!Array.isArray(item) && typeof item === 'object') {
            for (let k in item) {
                if (item[k]) {
                    clss.push(k)
                }
            }
        } else if (Array.isArray(item)) {
            clss.push(item.join(" "))
        }
    }
    return clss.join(' ')
}