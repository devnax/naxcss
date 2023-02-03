import aliases from './aliases'

type Props = { [key: string]: any }
type Option = {
   breakpoints?: { [key: string]: number }
}

const CACHE = new Map<string, string>();
const uid = () => "_" + Math.random().toString(36).substring(2, 8);
const isObject = (v: any) => typeof v === "object" && !Array.isArray(v);
const number_val_props = ["fontWeight", "lineHeight", "opacity", "zIndex", "flex", "order"]
const formatPropName = (name: string) => name.split(/(?=[A-Z])/).join("-").toLowerCase();
const formatValue = (val: any, key: string) => {
   return typeof val === 'number' && !number_val_props.includes(key) ? `${val}px` : val
}


export const generateCss = (props: Props, baseClass: string, options?: Option) => {
   let stack: any = []
   let main_css: any = ''

   for (let key in props) {
      const cssval = props[key]
      if (key.startsWith("&")) {
         stack = [
            ...stack,
            ...generateCss(cssval, key.replace('&', baseClass), options)
         ]
      } else {

         const name = formatPropName(key)
         const aliasCallback = (aliases as any)[key]

         if (isObject(cssval)) {
            // create media
            const breakpointKeys = Object.keys(options?.breakpoints || {})
            if (!options?.breakpoints || !breakpointKeys.length) {
               throw new Error(`Invaid Value ${key}`);
            }
            let breakpoints: any = {}
            for (let bk in cssval) {
               if (breakpointKeys.includes(bk)) {
                  breakpoints[bk] = options?.breakpoints[bk]
               }
            }

            breakpoints = Object.fromEntries(Object.entries(breakpoints).sort(([, a]: any, [, b]: any) => a - b))

            for (let breakpointKey of Object.keys(breakpoints).reverse()) {
               const breakpointNum = breakpoints[breakpointKey]
               const _mval = formatValue(cssval[breakpointKey], key)
               let media = ''
               const aliasObject = aliasCallback && aliasCallback(_mval)
               if (aliasObject) {
                  let alias_css = ''
                  for (let askey in aliasObject) {
                     alias_css += `${askey}:${formatValue(aliasObject[askey], askey)};`
                  }
                  media = `@media screen and (min-width: ${breakpointNum}px){.${baseClass}{${alias_css}}}`
               } else {
                  media = `@media screen and (min-width: ${breakpointNum}px){.${baseClass}{${name}:${_mval}}}`
               }

               stack.push(media)
            }

         } else {
            const aliasObject = aliasCallback && aliasCallback(cssval)
            if (aliasObject) {
               for (let askey in aliasObject) {
                  main_css += `${askey}:${formatValue(aliasObject[askey], askey)};`
               }
            } else {
               main_css += `${name}:${formatValue(cssval, key)};`
            }
         }
      }
   }

   stack.push(`.${baseClass}{${main_css}}`)

   return stack
}


export const css = (_css: Props, options?: Option) => {
   const cacheKey = JSON.stringify(_css)
   let _bashClass = CACHE.get(cacheKey)
   if (_bashClass) {
      return _bashClass
   }
   const baseClass = uid()
   const generated = generateCss(_css, baseClass, options)
   CACHE.set(cacheKey, baseClass)
   const tag = document.createElement("style");
   tag.innerHTML = generated.reverse().join(' ')
   tag.setAttribute(`data-nax-css`, baseClass)
   document.head.append(tag)
   return baseClass

}

