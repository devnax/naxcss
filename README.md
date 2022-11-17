
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
   },
   getFactory: (factory) => {

   }
}

const classname = css<Value, Alias>({
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



type AliasesProps<Value> = {
   bgcolor?: CSSValueType<Value> | CSS.Properties['background'];
   bgimage?: CSSValueType<Value> | CSS.Properties['backgroundImage'];
   bgsize?: CSSValueType<Value> | CSS.Properties['backgroundSize'],
   bgposition?: CSSValueType<Value> | CSS.Properties['backgroundPosition'],
   bgrepeat?: CSSValueType<Value> | CSS.Properties['backgroundRepeat'],
   bg?: CSSValueType<Value> | CSS.Properties['background'];
   p?: CSSValueType<Value> | CSS.Properties['padding'];
   pt?: CSSValueType<Value> | CSS.Properties['padding'];
   pr?: CSSValueType<Value> | CSS.Properties['padding'];
   pb?: CSSValueType<Value> | CSS.Properties['padding'];
   pl?: CSSValueType<Value> | CSS.Properties['padding'];
   px?: CSSValueType<Value> | CSS.Properties['padding'];
   py?: CSSValueType<Value> | CSS.Properties['margin'];
   m?: CSSValueType<Value> | CSS.Properties['margin'];
   mt?: CSSValueType<Value> | CSS.Properties['margin'];
   mr?: CSSValueType<Value> | CSS.Properties['margin'];
   mb?: CSSValueType<Value> | CSS.Properties['margin'];
   ml?: CSSValueType<Value> | CSS.Properties['margin'];
   mx?: CSSValueType<Value> | CSS.Properties['margin'];
   my?: CSSValueType<Value> | CSS.Properties['margin'];
   size?: CSSValueType<Value> | CSS.Properties['width'];
   radius?: CSSValueType<Value> | CSS.Properties['borderRadius'];
   shadow?: CSSValueType<Value> | CSS.Properties['boxShadow'];

   w?: CSSValueType<Value> | CSS.Properties["width"];
   h?: CSSValueType<Value> | CSS.Properties["height"];
   maxw?: CSSValueType<Value> | CSS.Properties["width"];
   minw?: CSSValueType<Value> | CSS.Properties["width"];
   maxh?: CSSValueType<Value> | CSS.Properties["height"];
   minh?: CSSValueType<Value> | CSS.Properties["height"];

   flexBox?: CSSValueType<Value> | CSS.Properties["display"];
   direction?: CSSValueType<Value> | CSS.Properties["flexDirection"];
   flexRow?: CSSValueType<Value> | CSS.Properties["flexDirection"];
   flexColumn?: CSSValueType<Value> | CSS.Properties["flexDirection"];
   flexWraped?: CSSValueType<Value> | CSS.Properties["flexWrap"];
   justifyStart?: CSSValueType<Value> | CSS.Properties["justifyContent"];
   justifyEnd?: CSSValueType<Value> | CSS.Properties["justifyContent"];
   justifyCenter?: CSSValueType<Value> | CSS.Properties["justifyContent"];
   justifyBetween?: CSSValueType<Value> | CSS.Properties["justifyContent"];
   justifyAround?: CSSValueType<Value> | CSS.Properties["justifyContent"];
   justifyEvenly?: CSSValueType<Value> | CSS.Properties["justifyContent"];

   itemsStart?: CSSValueType<Value> | CSS.Properties["alignItems"];
   itemsEnd?: CSSValueType<Value> | CSS.Properties["alignItems"];
   itemsCenter?: CSSValueType<Value> | CSS.Properties["alignItems"];
   itemsStretch?: CSSValueType<Value> | CSS.Properties["alignItems"];
   itemsBetween?: CSSValueType<Value> | CSS.Properties["alignItems"];
   itemsAround?: CSSValueType<Value> | CSS.Properties["alignItems"];

   contentStart?: CSSValueType<Value> | CSS.Properties["alignContent"];
   contentEnd?: CSSValueType<Value> | CSS.Properties["alignContent"];
   contentCenter?: CSSValueType<Value> | CSS.Properties["alignContent"];
   contentStretch?: CSSValueType<Value> | CSS.Properties["alignContent"];
   contentBetween?: CSSValueType<Value> | CSS.Properties["alignContent"];
   contentAround?: CSSValueType<Value> | CSS.Properties["alignContent"];
}
```