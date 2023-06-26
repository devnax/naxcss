# naxcss 

The [naxcss](https://www.npmjs.com/package/naxcss) package is a very lightweight css framework. This is a performant and flexible CSS-in-JS library that allows developers to write CSS styles using JavaScript. It provides a way to encapsulate styles within JavaScript components, making it easier to manage and manipulate styles dynamically.

## Table of Contents

- [Quick Start](#quick-start)
- API
  - [Generate Class Names — `css`](#css)
  - [Animation Keyframes — `keyframes`](#animation-keyframes)
  - [Options](#options)
  - [alpha color — `alpha`](#alpha)
  - [Make Cache Key — `makeCacheKey`](#make-cache-key)
- [Caching - `NAXCSS_CACHE`](#caching)
- [Server Side Rendering](https://emotion.sh/docs/ssr#api)
- [Typescript](https://emotion.sh/docs/ssr#api)
   - [Load Server Cache - `loadServerCache`](#load-server-cache)

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
app.classList.add(classname)
```

## API

### css

The `css` function accepts styles as a object and returns a class name or css factory.

#### Object Styles

```jsx
import { css } from 'naxcss '

const App = () => {
   const cls = css({
      backgroundColor: 'hotpink',
      '&:hover': {
        color: "red"
      }
   })
   return(
     <div className={cls} >
       This has a hotpink background.
     </div>
   )
}

```

### Animation Keyframes

`keyframes` generates a unique animation name that can be used to animate elements with CSS animations.

**String Styles**

```jsx
// @live
import { css, keyframes } from 'naxcss '

const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }

  70% {
    transform: translate3d(0, -15px, 0);
  }

  90% {
    transform: translate3d(0,-4px,0);
  }
`

render(
  <img
    className={css`
      width: 96px;
      height: 96px;
      border-radius: 50%;
      animation: ${bounce} 1s ease infinite;
      transform-origin: center bottom;
    `}
    src={logoUrl}
  />
)
```

**Object Styles**

```jsx
// @live
import { css, keyframes } from 'naxcss '

const bounce = keyframes({
  'from, 20%, 53%, 80%, to': {
    transform: 'translate3d(0,0,0)'
  },
  '40%, 43%': {
    transform: 'translate3d(0, -30px, 0)'
  },
  '70%': {
    transform: 'translate3d(0, -15px, 0)'
  },
  '90%': {
    transform: 'translate3d(0, -4px, 0)'
  }
})

render(
  <img
    src={logoUrl}
    className={css({
      width: 96,
      height: 96,
      borderRadius: '50%',
      animation: `${bounce} 1s ease infinite`,
      transformOrigin: 'center bottom'
    })}
  />
)
```

### cx

`cx` is emotion's version of the popular [`classnames` library](https://github.com/JedWatson/classnames). The key advantage of `cx` is that it detects emotion generated class names ensuring styles are overwritten in the correct order. Emotion generated styles are applied from left to right. Subsequent styles overwrite property values of previous styles.

**Combining class names**

```jsx
import { cx, css } from 'naxcss '

const cls1 = css`
  font-size: 20px;
  background: green;
`
const cls2 = css`
  font-size: 20px;
  background: blue;
`

<div className={cx(cls1, cls2)} />
```

**Conditional class names**

```jsx
const cls1 = css`
  font-size: 20px;
  background: green;
`
const cls2 = css`
  font-size: 20px;
  background: blue;
`

const foo = true
const bar = false


<div
  className={cx(
    { [cls1]: foo },
    { [cls2]: bar }
  )}
/>
```

**Using class names from other sources**

```jsx
const cls1 = css`
  font-size: 20px;
  background: green;
`

<div
  className={cx(cls1, 'profile')}
/>
```

## Custom Instances

With `naxcss /create-instance`, you can provide custom options to Emotion's cache.

The main `naxcss ` entrypoint can be thought of as a call to `naxcss /create-instance` with sensible defaults for most applications.

```javascript
import createEmotion from 'naxcss /create-instance'

export const {
  flush,
  hydrate,
  cx,
  merge,
  getRegisteredStyles,
  injectGlobal,
  keyframes,
  css,
  sheet,
  cache
} = createEmotion()
```

### Upside

- Calling it directly will allow for some low level customization.

- Create custom names for emotion APIs to help with migration from other, similar libraries.

- Could set custom `key` to something other than `css`

### Downside

- Introduces some amount of complexity to your application that can vary depending on developer experience.

- Required to keep up with changes in the repo and API at a lower level than if using `naxcss ` directly

### Primary use cases

- Using emotion in embedded contexts such as an `<iframe/>`

- Setting a [nonce](/packages/cache#nonce-string) on any `<style/>` tag emotion creates for security purposes

- Use emotion with a container different than `document.head` for style elements

- Using emotion with custom stylis plugins

## Multiple instances in a single app example

```jsx
import createEmotion from 'naxcss /create-instance'

export const {
  flush,
  hydrate,
  cx,
  merge,
  getRegisteredStyles,
  injectGlobal,
  keyframes,
  css,
  sheet,
  cache
} = createEmotion({
  // The key option is required when there will be multiple instances in a single app
  key: 'some-key'
})
```

## Options

`createEmotion` accepts the same options as [createCache](/packages/cache#options) from `@emotion/cache`.