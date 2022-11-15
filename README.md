
#### naxcss
light and simple css injector. this is faster then emotion-css


```js
import css from 'naxcss'

const options = {
   classPrefix: "naxcss",
   getProp: (key, value) => {
      if(key === 'any'){
         return false
      }
      return true
   },
   getAliases: (aliases) => {
      return aliases
   },
   breakpoints: {
      xs: 0,
      sm: 500,
      ...
   }
}

const classname = css({
   width: 100,
   height: 200,
   bgcolor: "red",

   /// responsive with breakpoints
   width: {
      xs: 100,
      sm: 300
   },
   height: {
      xs: 100,
      sm: 300
   },
   bgcolor: {
      xs: "red",
      sm: "blue"
   },

   ...css_properties,
   ...aliases
}, options)



export interface AliasesPops {
   bgcolor?: PropertyValueType | CSS.Properties['background'];
   bgimage?: PropertyValueType | CSS.Properties['background'];
   bgsize?: PropertyValueType | CSS.Properties['backgroundSize'],
   bgposition?: PropertyValueType | CSS.Properties['backgroundPosition'],
   bgrepeat?: PropertyValueType | CSS.Properties['backgroundRepeat'],
   bg?: PropertyValueType | CSS.Properties['background'];
   p?: PropertyValueType | CSS.Properties['padding'];
   pt?: PropertyValueType | CSS.Properties['padding'];
   pr?: PropertyValueType | CSS.Properties['padding'];
   pb?: PropertyValueType | CSS.Properties['padding'];
   pl?: PropertyValueType | CSS.Properties['padding'];
   px?: PropertyValueType | CSS.Properties['padding'];
   py?: PropertyValueType | CSS.Properties['margin'];
   m?: PropertyValueType | CSS.Properties['margin'];
   mt?: PropertyValueType | CSS.Properties['margin'];
   mr?: PropertyValueType | CSS.Properties['margin'];
   mb?: PropertyValueType | CSS.Properties['margin'];
   ml?: PropertyValueType | CSS.Properties['margin'];
   mx?: PropertyValueType | CSS.Properties['margin'];
   my?: PropertyValueType | CSS.Properties['margin'];
   size?: PropertyValueType | CSS.Properties['width'];
   radius?: PropertyValueType | CSS.Properties['borderRadius'];
   shadow?: PropertyValueType | CSS.Properties['boxShadow'];
}
```