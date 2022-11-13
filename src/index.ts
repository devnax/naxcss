import aliases from './aliases'
import { CSSObject } from './types'
import { OptionsProps } from './types'

const isObject = (v: any) => typeof v === "object" && !Array.isArray(v);
const uid = () => Math.random().toString(36).substring(2, 8);
const CACHE = new Map<string, string>();

const formatePropName = (name: string) =>
  name
    .split(/(?=[A-Z])/)
    .join("-")
    .toLowerCase();


const val_formate = (val: any, key: string) => {
  if (!isNaN(val) && !(key === "font-weight" || key === "line-height")) {
    val = `${val}px`;
  }
  return val
}

const object_tocss = (_css: Partial<CSSObject>, cb: (key: string, val: any) => boolean) => {
  let str = ''
  for (let key in _css) {
    let val = (_css as any)[key]
    key = formatePropName(key)
    val = val_formate(val, key)
    if (cb(key, val)) {
      str += `${key}: ${val};`;
    }
  }
  return str
}

const make_css = (_css: Partial<CSSObject>, id?: string, cls?: string, tag?: any) => {
  if (!id) {
    id = id || "css-" + uid();
    const mainKey = JSON.stringify(_css);
    const exist_id = CACHE.get(mainKey);
    if (exist_id) {
      return exist_id;
    }
    CACHE.set(mainKey, id);
    if (!tag) {
      tag = document.createElement("style");
      tag.classList.add(`nx${id}`);
      document.head.append(tag);
    }
  }
  cls = cls || id;
  let assigned_keys: string[] = []
  let prop_str: string = "";
  for (let key in _css) {
    let val = (_css as any)[key];
    if (isObject(val)) {
      make_css(val, id, key.replace("&", cls), tag);
    } else {
      let alias = (aliases as any)[key];
      if (typeof alias === "function") {
        prop_str += object_tocss(alias(val, key), (k, v) => {
          if (!assigned_keys.includes(k)) {
            if (window.CSS.supports(k, v)) {
              assigned_keys.push(k)
              return true
            }
          }
          return false
        })
      } else {
        key = formatePropName(alias || key)
        if (!assigned_keys.includes(key)) {
          val = val_formate(val, key)
          if (window.CSS.supports(key, val)) {
            prop_str += `${key}: ${val};`;
            assigned_keys.push(key)
          }
        }
      }
    }
  }
  tag.innerHTML += `.${cls}{${prop_str}}`;
  return id;
};


export const css = (_css: Partial<CSSObject>, options?: OptionsProps) => make_css(_css);
