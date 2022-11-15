import * as CSS from 'csstype'

export type PropertyValyeTypeObject = { [key: string]: string | number }
export type PropertyValueType = number | string | PropertyValyeTypeObject
export type CSSProperties = AliasesPops & CSS.PropertiesFallback<PropertyValueType>
export type CSSPropertiesWithMultiValues = {
   [K in keyof CSSProperties]:
   | CSSProperties[K]
   | Array<Extract<CSSProperties[K], string>>
}

export type CSSPseudos = { [K in CSS.Pseudos]?: CSSObject | AliasesPops }

export interface ArrayCSSInterpolation extends Array<CSSInterpolation | AliasesPops> { }

export type InterpolationPrimitive =
   | null
   | undefined
   | boolean
   | number
   | string
   | Keyframes
   | CSSObject
   | AliasesPops
   | PropertyValueType

export type CSSInterpolation = InterpolationPrimitive | ArrayCSSInterpolation | AliasesPops

export interface CSSOthersObject {
   [propertiesName: string]: CSSInterpolation
}

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

export interface CSSObject extends CSSPropertiesWithMultiValues,
   CSSPseudos,
   CSSOthersObject { }


export type Keyframes = {
   name: string
   styles: string
   anim: number
   toString: () => string
} & string

export type AliasFN = (v: any, k: string) => Partial<CSSObject>;
export type getAlisesProps = AliasesPops | { [key: string]: any }
export interface OptionsProps {
   getProp?: (key: string, value: string) => boolean;
   getAliases?: (aliases: getAlisesProps) => getAlisesProps;
   classPrefix?: string;
   breakpoints: { [key: string]: number }
}


export type CSSStack = {
   [clsNmae: string]: Partial<{ [key in keyof CSSObject]: string }>
}

export type PropMediaType = {
   [breakpoint: number]: {
      [clsNmae: string]: Partial<CSSObject>
   }
}