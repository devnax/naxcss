
#### naxcss
light and simple css injector. this is 4x faster then emotion-css


```js
import {css} from 'naxcss'

const options = {
   classPrefix: "naxcss",
   cachePrefix: "",
   breakpoints: {
      xs: 0,
      sm: 500,
      ...
   },
    getAlias: (aliases) => {
      return aliases
   },
   getCss: (_css) => {

   },
   getValue: (value, propname) => {
      return value
   },
   getProps: (prop, vaue) => {
      // return css object or void
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


```



### Animation Keyframes

```js

import {keyframes} from 'naxcss'

const classname = keyframes({
   '0%': {
      opacity: 0,
      '& .child':{
         background: "transparent"
      }
   },
   '100%':{
      opacity: 1,
      '& .child':{
         background: "red"
      }
   }
})

```


### Advanch Animation 

```js

import {animation} from 'naxcss'

const classname = animation({
   duration: 300,
   init: {
      opacity: 0,
      scale: 1,
      skew: 0,
      rotate: 100,
      perspective: 20,
      x: 50,
      y: 50
   },
   enter:{
      opacity: 1,
   },
   exit: {
      ...
   },
   exited: {
      ...
   },
   cssOption: {}, // css options 
}, ({type, classname}) => {
   document.getElementById("animate").classList.add(classname)
})

```



### Hex to Alpha

```js

import {alpha} from 'naxcss'

alpha("#aaaaaa", .4)

```



#### Default Aliases

```ts

type AliasesProps<Value> = {
   bgcolor?: CSS.Properties['background'];
   bgImage?: CSS.Properties['backgroundImage'];
   bgSize?: CSS.Properties['backgroundSize'],
   bgPosition?: CSS.Properties['backgroundPosition'],
   bgRepeat?: CSS.Properties['backgroundRepeat'],
   bg?: CSS.Properties['background'];
   p?: CSS.Properties['padding'];
   pt?: CSS.Properties['padding'];
   pr?: CSS.Properties['padding'];
   pb?: CSS.Properties['padding'];
   pl?: CSS.Properties['padding'];
   px?: CSS.Properties['padding'];
   py?: CSS.Properties['margin'];
   m?: CSS.Properties['margin'];
   mt?: CSS.Properties['margin'];
   mr?: CSS.Properties['margin'];
   mb?: CSS.Properties['margin'];
   ml?: CSS.Properties['margin'];
   mx?: CSS.Properties['margin'];
   my?: CSS.Properties['margin'];
   radius?: CSS.Properties['borderRadius'];
   shadow?: CSS.Properties['boxShadow'];

   w?: CSS.Properties["width"];
   h?: CSS.Properties["height"];
   maxw?: CSS.Properties["width"];
   minw?: CSS.Properties["width"];
   maxh?: CSS.Properties["height"];
   minh?: CSS.Properties["height"];

   flexBox?: boolean;
   direction?: boolean;
   flexRow?: boolean;
   flexColumn?: boolean;
   flexWraped?: boolean;
   justifyStart?: boolean;
   justifyEnd?: boolean;
   justifyCenter?: boolean;
   justifyBetween?: boolean;
   justifyAround?: boolean;
   justifyEvenly?: boolean;

   itemsStart?: boolean;
   itemsEnd?: boolean;
   itemsCenter?: boolean;
   itemsStretch?: boolean;
   itemsBetween?: boolean;
   itemsAround?: boolean;

   contentStart?: boolean;
   contentEnd?: boolean;
   contentCenter?: boolean;
   contentStretch?: boolean;
   contentBetween?: boolean;
   contentAround?: boolean;
}
```
