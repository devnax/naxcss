# naxcss 

The [naxcss](https://www.npmjs.com/package/naxcss) package is a very lightweight css in js framework. This is a performant and flexible CSS-in-JS library that allows developers to write CSS styles using JavaScript. It provides a way to encapsulate styles within JavaScript components, making it easier to manage and manipulate styles dynamically.

> If you want to develop you own custom UI library then you can use the [naxui-manager](https://www.npmjs.com/package/naxui-manager)

## Table of Contents

- [Quick Start](#quick-start)
- API
  - [Generate Class Names — `css`](#css)
  - [Global CSS — `globalCss`](#css)
  - [Animation Keyframes — `keyframes`](#animation-keyframes)
  - [Options](#options)
  - [Responsive](#responsive)
  - [alpha color — `alpha`](#alpha)
  - [classNames — `classNames`](#classnames)
- [Caching - `NAXCSS_CACHE`](#naxcss_cache)
  - [Make Cache Key — `makeCacheKey`](#make-cache-key)
- [Server Side Rendering](#server-side-rendering)
- [Typescript](#typescript)
 - [Use Types](#use-types)

## Quick Start

Install the package using npm in your project directory.

```bash
npm install --save naxcss 
```

```js
import { css } from 'naxcss '

const box = document.getElementById('box')
const classname = css({
   background: "red"
})
box.classList.add(classname)
```

## API

### css

The `css` function accepts styles as an `object` and `option`, and returns a class name or css.

```tsx
import { css } from 'naxcss '

const App = () => {
   const cls = css<ExtraType>({
      backgroundColor: 'orange',
      '&:hover': {
        color: "red"
      }
   })
   return(
     <div className={cls} >
       This has a orange background.
     </div>
   )
}

```

### globalCss
Globally inject css. The `globalCss` function accepts `key`, styles as an `object`, `option`. The `key` is the identifier for the style tag .

```ts
import { globalCss } from 'naxcss '

globalCss<Type>("any-unique-key", {
   "body": {
      background: "red"
   },
   "*": {
      margin: 0,
      padding: 0,
      listStyle: "none"
   }
}, option)

```

### Animation Keyframes

The `keyframes` function accepts an object where the key will be number and the value will be style object and that returns the animation name or css.

```jsx
import { css, keyframes } from 'naxcss'

const animationaName = keyframes(
  0: {
   transform: "scale(0)",
   opacity: 0
  },
  100: {
   transform: "scale(1)",
   opacity: 1
  }
)

const className = css({
   animationName
})

render(
  <img
    className={className}
    src={logoUrl}
  />
)
```


## Options
The `Option` argument a config for your css. you can handle the css compilation and do some more logic.

```js
import { css } from 'naxcss '

const option = {
   // set you own class prefix
   classPrefix: "css-",
   
   // css selector type, default class
   selectorType: "class" | "id",

   // Defaul the css fucntion return a class name. If you want to get whole css factory the you can set return_css true.
   return_css: false,

   // You can use it for your responsive breakpoint. you can define your screen size with a name then it will work for your responsive design.
   breakpoints: { 
      xs: 500,
      sm: 700,
      md: 900,
      ...
    },

    // You can add your own css property with the aliases.
   aliases: {
      m: (v) => {
         return {margin: v}
      },
      mx: (v) => {
         return {
            marginLeft: v,
            marginRight: v
         }
      }
   };


   // The getValue method give you to customize your css value. This method will call when the css value is rendering and you have to return a new value. like the css value is {background: "primary"}
   getValue: (value, prop, _css) => {
      if(value === 'primary'){
         return "your primary color"
      }
   },

   // With this method you can use a template with css key or value.
   getProps: (prop, value, _css) =>{
      if(value === "h1"){
         return {
            fontSize: 44,
            color: "#333",
            ...
         }
      }
   },

   // You can get the style tag after inject in the browser.
   getStyleTag: (tag) => {
      // do somthing
   }
}

const cls = css({}, option)

```



## Responsive
It's very simple to responsive any ui. remember you must need to add `breakpoints` in the css option. then the key which you add in `breakpoints` that you can use to responsive.

```jsx
import { css } from 'naxcss '

const App = () => {
   const cls = css<ExtraType>({
      backgroundColor: {
         xs: "red",
         sm: "green",
      },
   })
   return(
     <div className={cls} >
       Hello world
     </div>
   )
}

```


## Alpha
Simple function to make a hex to alpha color
```js
import {alpha} from 'naxcss'

const newColor = alpha("#bf2d93", .1)
```


## classNames
In this function you can merge many class names.

```js
import {classNames} from 'naxcss'
const classList = classNames("first", "second", "third", {any: false, active: true}, ["a", "b"])
```



### NAXCSS_CACHE
This is a JS Map object where stored all the css cache. the every css render will store a cache in the `NAXCSS_CACHE`. you can use this to read and modify your css. and also you can use this for server side rendering.
Every css cache has a  `css`  - rendered css string, `classname` - css class name, `raw_css` - css style object.

```js
import {NAXCSS_CACHE, makeCacheKey} from 'naxcss'

const key = makeCacheKey({background: "red"})
NAXCSS_CACHE.get(key)
NAXCSS_CACHE.set()
...
```



## makeCacheKey
Every css render there has a cache key so If you want to make a cache key then you can use this function. this will help you to read the cache from the `NAXCSS_CACHE` factory. for this function there are tow arguments `css` style object and `option`.

```js
import {makeCacheKey} from 'naxcss'

const cache_key = makeCacheKey({...css_object}),
```



### Server Side Rendering
How do you render css in server side. 
for the `NextJs` example you can do this. In your _document root file  you can use for server side rendering.


```js
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { NAXCSS_CACHE } from 'naxcss'

export default class MyDocument extends Document {

   render() {
      let css: any = []
      NAXCSS_CACHE.forEach((c, idx) => {
         css_cache.push(c)
         css.push(<style
            key={c.classname + idx}
            data-naxcss={c.classname}
            dangerouslySetInnerHTML={{ __html: c.css }}
         />)
      })

      return (
         <Html lang="en">
             <Head>
                 {css}
             </Head>
             <body>
                 <Main />
                 <NextScript />
             </body>
         </Html>
     );
   }
}


```



### Typescript
For the Typescript, How you can use the type.

```ts
import {css} from 'naxcss'

type MorePros = {
   m: string | number;
   mx: string | number;
}
const cls = css<MorePros>({})

```

### Use Types

```ts
import {CSSProps, CACHE_TYPE, OptionsProps} from 'naxcss'
```