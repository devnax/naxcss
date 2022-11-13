import aliases from './aliases'
import { CSSObject, CACHE_PROPS } from './types'
import { OptionsProps } from './types'
export * from './types'
const isObject = (v: any) => typeof v === "object" && !Array.isArray(v);
const uid = () => Math.random().toString(36).substring(2, 8);
const CACHE = new Map<string, CACHE_PROPS>();

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

const make_css = (_css: Partial<CSSObject>, id?: string, cls?: string, tag?: any, cache_key?: string, options?: OptionsProps) => {
  if (!id) {
    id = id || "css-" + uid();
    cache_key = JSON.stringify(_css);
    const cache = CACHE.get(cache_key);
    if (cache) {
      return cache.id;
    }
    CACHE.set(cache_key, {
      id,
      invalids: {}
    });

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
      make_css(val, id, key.replace("&", cls), tag, cache_key, options);
    } else {
      const aliasesList = (options?.getAliases && options?.getAliases(aliases)) || aliases
      let alias = (aliasesList as any)[key];
      if (typeof alias === "function") {
        prop_str += object_tocss(alias(val, key), (k, v) => {
          if (!assigned_keys.includes(k)) {
            if (typeof options?.invalids === "function") {
              if (window.CSS.supports(k, v)) {
                assigned_keys.push(k)
                return true
              } else {
                if (cache_key) {
                  const cache = CACHE.get(cache_key)
                  if (cache) {
                    CACHE.set(cache_key, {
                      ...cache,
                      invalids: {
                        ...cache.invalids,
                        [k]: v
                      }
                    })
                  }
                }
              }
            } else {
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
          if (typeof options?.invalids === "function") {
            if (window.CSS.supports(key, val)) {
              prop_str += `${key}: ${val};`;
              assigned_keys.push(key)
            } else {
              if (cache_key) {
                const cache = CACHE.get(cache_key)
                if (cache) {
                  CACHE.set(cache_key, {
                    ...cache,
                    invalids: {
                      ...cache.invalids,
                      [key]: val
                    }
                  })
                }
              }
            }
          } else {
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


export const css = (_css: Partial<CSSObject>, options?: OptionsProps) => {
  const cache_key = make_css(_css, undefined, undefined, undefined, undefined, options)
  if (typeof options?.invalids === 'function') {
    const cache = CACHE.get(cache_key)
    if (cache) {
      options.invalids(cache.invalids)
    }
  }
  return cache_key
};
