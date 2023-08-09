import * as CSS from 'csstype'

export type CSSProps<P = {}> =
   | { [x: string]: CSSProps<P> }
   | string
   | number
   | CSS.Properties
   | P

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
   selectorType?: "class" | "id";
   classPrefix?: string;
   breakpoints?: { [key: string]: number };
   aliases?: getAlisesProps;
   getValue?: (value: string | number, prop: string, css: CSSProps) => (string | number);
   getProps?: (prop: string, value: string | number, css: CSSProps) => CSSProps<P> | void;
   getStyleTag?: (styleTag: HTMLStyleElement) => void;
}


export type GlobalCSSType<P> = {
   [t: string]: CSSProps<P>
}