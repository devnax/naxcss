const PREFIXES = ['webkit', 'moz', 'ms', 'o']
let _declaration: CSSStyleDeclaration;
const CACHE = new Map()

const ucf = (t: string) => t.substr(0, 1).toUpperCase() + t.substr(1)

export const withPrefix = (prop: string, value: string) => {
   const declaration = _declaration || (_declaration = document?.createElement("div").style)
   value = value.toString()

   declaration.setProperty(prop, value)
   if (declaration.getPropertyValue(prop)) {
      return `${prop}:${value};`
   }

   const gc = CACHE.get(prop)
   if (gc) {
      return `${gc._prop}:${gc._vprefix}${value};`
   }

   let _prop = prop;
   let _value = value;
   let _vprefix = ''; // vaue prefix

   if (declaration[prop as any] !== undefined) {
      _prop = prop
   } else {
      const format_prop = prop.split('-').map(_ => ucf(_)).join('')
      for (let prefix of PREFIXES) {
         if (declaration[prefix + format_prop as any]) {
            _prop = `-${prefix}-${prop}`
            break;
         }
      }
   }

   declaration.setProperty(_prop, value)

   if (declaration.getPropertyValue(_prop)) {
      _value = value
   } else {
      for (let prefix of PREFIXES) {
         const v = `-${prefix}-${value}`
         declaration.setProperty(_prop, v)
         if (declaration[_prop as any] === v) {
            _value = v
            _vprefix = `-${prefix}-`
            break;
         }
      }
   }

   CACHE.set(prop, { _prop, _vprefix })
   return `${_prop}:${_value};`
}