import * as CSS from 'csstype'
import Factory from './Factory'
type ValueOf<T> = T[keyof T];
export type PropertyValyeTypeObject<Value> = { [key: string]: Value & (string | number) }
export type CSSValueType<Value> = Value & (string | number)
export type CSSProperties<Value> = CSS.Properties<CSSValueType<Value>>
export type CSSPropertiesWithMultiValues<Value> = {
   [K in keyof CSSProperties<Value>]: Value
   | CSSProperties<Value>[K]
   | Array<Extract<CSSProperties<Value>[K], string>>
}

export type CSSPseudos<Value, Alias> = { [K in CSS.Pseudos]?: CSSObject<Value, Alias> }

export type ArrayCSSInterpolation<Value, Alias> = Array<CSSInterpolation<Value, Alias>>

export type InterpolationPrimitive<Value, Alias> =
   | null
   | undefined
   | boolean
   | number
   | string
   | Keyframes
   | CSSObject<Value, Alias>
   | Value
   | CSSValueType<Value>
   | ValueOf<Alias>

export type CSSInterpolation<Value, Alias> = InterpolationPrimitive<Value, Alias> | ArrayCSSInterpolation<Value, Alias>

export type CSSOthersObject<Value, Alias> = {
   [propertiesName: string]: CSSInterpolation<Value, Alias>
}

export type AliasesProps<Value> = {
   bgColor?: CSSValueType<Value> | CSS.Properties['background'];
   bgImage?: CSSValueType<Value> | CSS.Properties['backgroundImage'];
   bgSize?: CSSValueType<Value> | CSS.Properties['backgroundSize'],
   bgPosition?: CSSValueType<Value> | CSS.Properties['backgroundPosition'],
   bgRepeat?: CSSValueType<Value> | CSS.Properties['backgroundRepeat'],
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

export type CSSObject<Value, Alias = { [key: string]: CSSValueType<Value> | any }> = AliasesProps<Value> | CSSPropertiesWithMultiValues<Value> |
   CSSPseudos<Value, Alias> |
   CSSOthersObject<Value, Alias> | Alias

export type Keyframes = {
   name: string
   styles: string
   anim: number
   toString: () => string
} & string

export type AliasFN = (v: any, k: string) => Partial<CSSObject<any, any>>;
export type getAlisesProps<Value = any> = AliasesProps<Value> | { [key: string]: any }
export interface OptionsProps<Value = any> {
   getProp?: (key: string, value: string) => boolean;
   getAliases?: (aliases: getAlisesProps<Value>) => getAlisesProps<Value>;
   classPrefix?: string;
   breakpoints?: { [key: string]: number };
   getFactory?: (factory: Factory) => object
}


export type CSSStack<Value, Alias> = {
   [clsNmae: string]: Partial<{ [key in keyof CSSObject<Value, Alias>]: string }>
}

export type PropMediaType<Value, Alias> = {
   [breakpoint: number]: {
      [clsNmae: string]: Partial<CSSObject<Value, Alias>>
   }
}