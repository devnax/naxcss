import { renderCss } from "./core";
import { CSSProps, keyframesType, OptionsProps } from "./types";
import { CSS_CACHE, makeCacheKey, uid } from "./utils";
export * from './types'
export * from './utils'
export {
    CSS_CACHE
}

export const injectStyle = (_css: string, baseClass: string) => {
    if (typeof window !== 'undefined' && window.document) {
        const has = document?.querySelector(`[data-naxcss="${baseClass}"]`)
        if (has) {
            return
        }
        const tag = document?.createElement("style");
        tag.innerHTML = _css
        tag.setAttribute(`data-naxcss`, baseClass)
        document?.head.append(tag)
    }
}

export const compilte_css = <P = {}>(_css: CSSProps<P>, options?: OptionsProps) => {
    return renderCss(_css, '', options).reverse().join('')
}

export const css = <P = {}>(_css: CSSProps<P>, options?: OptionsProps) => {
    const cache_key = makeCacheKey(_css, options)
    let _cache = CSS_CACHE.get(cache_key)
    if (_cache) {
        options?.getCss && options.getCss(_cache.css)
        if (options?.return) {
            return {
                css: _cache.css,
                name: _cache.name,
                cache: true
            }
        }
        return _cache.name
    }

    const id = uid(cache_key)
    const baseClass = (options?.classPrefix || "css-") + id

    if (typeof window !== 'undefined' && window.document) {
        const has = window.document.querySelector(`[data-naxcss="${baseClass}"]`)
        if (has) {
            CSS_CACHE.set(cache_key, {
                name: baseClass,
                css: has.innerHTML,
                css_raw: _css
            })
            if (options?.return) {
                return {
                    css: has.innerHTML,
                    name: baseClass,
                    cache: false
                }
            }

            return baseClass
        }
    }

    const generated = renderCss(_css, baseClass, options).reverse().join('')
    options?.getCss && options.getCss(generated)
    CSS_CACHE.set(cache_key, {
        name: baseClass,
        css: generated,
        css_raw: _css
    })

    if (options?.return) {
        return {
            css: generated,
            name: baseClass,
            cache: false
        }
    }
    injectStyle(generated, baseClass)
    return baseClass
}

export const keyframes = (framesObject: keyframesType, options?: OptionsProps) => {
    const cache_key = makeCacheKey(framesObject, options)
    let _cache = CSS_CACHE.get(cache_key)

    if (_cache) {
        options?.getCss && options.getCss(_cache.css)
        if (options?.return) {
            return {
                css: _cache.css,
                name: _cache.name,
                cache: true
            }
        }
        return _cache.name
    }

    let frames = ""
    const id = uid(cache_key)
    const baseClass = (options?.classPrefix || "css-") + id

    if (typeof window !== 'undefined' && window.document) {
        const has = window.document.querySelector(`[data-naxcss="${baseClass}"]`)
        if (has) {
            CSS_CACHE.set(cache_key, {
                name: baseClass,
                css: has.innerHTML,
                css_raw: framesObject
            })
            if (options?.return) {
                return {
                    css: has.innerHTML,
                    name: baseClass,
                    cache: false
                }
            }
            return baseClass
        }
    }

    for (let frameKey in framesObject) {
        const _css = framesObject[frameKey]
        const generated = renderCss(_css, baseClass, options).reverse()
        const main = generated[0]
        frames += `${frameKey}${main.replace("." + baseClass, '')}`
    }

    let _css = `@keyframes ${baseClass}{${frames}}`
    options?.getCss && options.getCss(_css)
    CSS_CACHE.set(cache_key, {
        name: baseClass,
        css: _css,
        css_raw: framesObject
    })
    if (options?.return) {
        return {
            css: _css,
            name: baseClass,
            cache: false
        }
    }

    injectStyle(_css, baseClass);
    return baseClass
}


export const alpha = (hex: string, opacity: number) => {
    return hex + Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255).toString(16).toUpperCase();
}
