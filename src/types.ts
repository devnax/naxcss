import * as CSS from 'csstype'

export type CSSProperties = AliasesPops | CSS.PropertiesFallback<number | string>
export type CSSPropertiesWithMultiValues = {
   [K in keyof CSSProperties]:
   | CSSProperties[K]
   | Array<Extract<CSSProperties[K], string>>
}

export type CSSPseudos = { [K in CSS.Pseudos]?: CSSObject & AliasesPops }

export interface ArrayCSSInterpolation extends Array<CSSInterpolation> { }

export type InterpolationPrimitive =
   | null
   | undefined
   | boolean
   | number
   | string
   | Keyframes
   | CSSObject
   | AliasesPops

export type CSSInterpolation = InterpolationPrimitive | ArrayCSSInterpolation | AliasesPops

export interface CSSOthersObject {
   [propertiesName: string]: CSSInterpolation
}


export interface AliasesPops {
   bgColor: string;
   bgImage: string;
   bgSize: CSS.Properties['backgroundSize'],
   bgPosition: CSS.Properties['backgroundPosition'],
   bgRepeat: CSS.Properties['backgroundRepeat'],
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
   invalids?: (props: { [key: string]: any }) => void;
   getAliases?: (aliases: getAlisesProps) => getAlisesProps
}



export interface CACHE_PROPS {
   id: string;
   invalids: { [key: string]: any }
}