
#### naxcss
light and simple css library. this is 4x faster then emotion-css


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
   aliases: {
      m: (v) => ({margin: `${v}px`}),
      ...
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


### Hex to Alpha

```js

import {alpha} from 'naxcss'

alpha("#aaaaaa", .4)

```




### CSS Cache Factory
CSS_CACHE this is a js Map object. In this object we store all the rendered css and others informarion. you can read all the rendered css from the CSS_CACHE variable. you can use it to render server side or you can modify the css from the cache.

```js

import {CSS_CACHE} from 'naxcss'

```


