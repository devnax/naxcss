import { renderCss, NAXCSS_CACHE } from "./core";
import { CSSProps, keyframesType, OptionsProps } from "./types";
import { loadServerCache, makeCacheKey, uid } from "./utils";
export * from './core'
export * from './types'
export * from './utils'

export const injectStyle = (_css: string, baseClass: string) => {
    if (typeof window !== 'undefined' && window.document) {
        if (document.querySelector(`[data-naxcss="${baseClass}"]`)) return;
        const tag = document.createElement("style");
        tag.innerHTML = _css
        tag.setAttribute(`data-naxcss`, baseClass)
        document.head.append(tag)
    }
}

export const css = <P = {}>(_css: CSSProps<P>, options?: OptionsProps): any => {
    loadServerCache(options)
    const cache_key = makeCacheKey(_css, options)
    let _cache = NAXCSS_CACHE.get(cache_key)

    if (_cache) {
        options?.getCss && options.getCss(_cache.css)
        if (options?.return_css) {
            return {
                css: _cache.css,
                classname: _cache.classname,
                cache: true
            }
        }
        return _cache.classname
    }

    const baseClass = (options?.classPrefix || "css-") + uid()
    const rendered = renderCss(_css, baseClass, options).reverse()
    const cssstring = rendered.join('')
    options?.getCss && options.getCss(cssstring)
    NAXCSS_CACHE.set(cache_key, {
        classname: baseClass,
        css: cssstring,
        css_raw: _css
    })

    if (options?.return_css) {
        return {
            css: cssstring,
            classname: baseClass,
            cache: false
        }
    }
    if (rendered.length) {
        injectStyle(cssstring, baseClass)
    }
    return baseClass
}

export const keyframes = (framesObject: keyframesType, options?: OptionsProps) => {
    loadServerCache(options)
    const cache_key = makeCacheKey(framesObject, options)
    let _cache = NAXCSS_CACHE.get(cache_key)

    if (_cache) {
        options?.getCss && options.getCss(_cache.css)
        if (options?.return_css) {
            return {
                css: _cache.css,
                classname: _cache.classname,
                cache: true
            }
        }
        return _cache.classname
    }

    let frames = ""
    const baseClass = (options?.classPrefix || "css-") + uid()
    for (let frameKey in framesObject) {
        const generated = renderCss(framesObject[frameKey], baseClass, options).reverse()
        frames += `${frameKey}${generated[0].replace("." + baseClass, '')}`
    }

    let _css = `@keyframes ${baseClass}{${frames}}`
    options?.getCss && options.getCss(_css)
    NAXCSS_CACHE.set(cache_key, {
        classname: baseClass,
        css: _css,
        css_raw: framesObject
    })
    if (options?.return_css) {
        return {
            css: _css,
            classname: baseClass,
            cache: false
        }
    }
    injectStyle(_css, baseClass);
    return baseClass
}

export const alpha = (hex: string, opacity: number) => {
    return hex + Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255).toString(16).toUpperCase();
}
