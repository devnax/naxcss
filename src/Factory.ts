import { PropMediaType, CSSStack, OptionsProps } from "./types";

class Factory<Value = any, Alias = any> {
   id: string = '';
   current_cls: string = '';
   medias: PropMediaType<Value, Alias> = {}
   css: CSSStack<Value, Alias> = {}
   options: Partial<OptionsProps<Value>> = {}
   generated = false

   setCSS(_css: { [k: string]: string }) {
      const cls = this.current_cls
      this.css = {
         ...this.css,
         [cls]: {
            ...(this.css[cls] || {}),
            ..._css
         }
      }
   }

   setMedia(breakpoint: number, _css: { [k: string]: string }) {
      const old = this.medias[breakpoint] || {}
      const cls = this.current_cls

      this.medias = {
         ...this.medias,
         [breakpoint]: {
            ...old,
            [cls]: {
               ...(old[cls] || {}),
               ..._css
            }
         }
      }
   }

   generate() {
      let raw = ''
      for (let cls in this.css) {
         raw += `.${cls}{${Object.values(this.css[cls]).join(";")}}`
      }

      for (let breakpoint in this.medias) {
         let css = this.medias[breakpoint]
         for (let cls in css) {
            raw += `@media screen and (min-width: ${breakpoint}px){.${cls}{${Object.values(css[cls]).join(";")}}}`
         }
      }
      const prefix = this.options?.classPrefix || "nax-"
      const tag = document.createElement("style");
      tag.innerHTML = raw
      tag.setAttribute(`data-${prefix}css`, this.id)
      document.head.append(tag)
      this.generated = true
   }
}


export default Factory