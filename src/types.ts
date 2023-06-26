import * as CSS from 'csstype'

export type CSSProps<P = {}> =
   | string
   | number
   | { [x: string]: CSSProps<P> }
   | CSS.Properties
   | P;

export type keyframesType<P = {}> = { [x: string]: CSSProps<P> }

export type CACHE_TYPE = {
   css: string;
   classname: string;
   css_raw: CSSProps<any>;
}

export type AliasFN = <P = {}>(v: any, k: string) => Partial<CSSProps<P>>;
export type AliasObjectType<P = {}> = { [key in keyof P]: AliasFN };

export type getAlisesProps = { [key: string]: any }

export interface OptionsProps<P = {}> {
   return_css?: boolean;
   classPrefix?: string;
   cachePrefix?: string;
   breakpoints?: { [key: string]: number };
   aliases?: getAlisesProps;
   getCss?: (_css: string) => void;
   getValue?: (value: string | number, prop: string) => (string | number);
   getProps?: (prop: string, value: string) => CSSProps<P> | void
}
