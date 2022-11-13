
#### naxcss
light and simple css injector. this is faster them emotion-css


```js
import css from 'naxcss'

const options = {
   invalids: (invalidProps) => {

   },
   getAliases: (aliases) => {
      return aliases
   }
}

const classname = css({
   ...css_properties,
   ...aliases
}, options)



interface AliasesPops {
   bgColor: string;
   bgImage: string;
   bg: string;
   p: number | string;
   pt: number | string;
   pr: number | string;
   pb: number | string;
   pl: number | string;
   px: number | string;
   py: number | string;
   m: number | string;
   mt: number | string;
   mr: number | string;
   mb: number | string;
   ml: number | string;
   mx: number | string;
   my: number | string;
   size: number | string;
   radius: number | string,
   shadow: number | string,
   gradientL: string;
   gradientR: string;
}
```