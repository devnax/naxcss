import * as CSS from 'csstype'

export type CSSPropsRoot<P = {}> = { [x: string]: CSSProps<P> }

export type CSSProps<P = {}> =
   | {
      [x: string]: CSSProps<P> | {
         [media: number]: CSSProps<P>
      } | {
         [fram: string]: CSSProps<P>
      }
   }
   | string
   | number
   | CSS.Properties
   | P
   | "@keyframes"
   | "@global"
   | "@media"

export type keyframesType<P = {}> = { [x: string]: CSSProps<P> }

export type CSSFactoryType = {
   css: string;
   cachekey: string;
   classname: string;
   css_raw: CSSProps<any>;
   cache: boolean;
   getStyleTag: () => HTMLStyleElement | null;
   deleteStyle: () => void;
   toString: () => string;
}

export type AliasFN = <P = {}>(v: any, k: string) => Partial<CSSProps<P>>;
export type AliasObjectType<P = {}> = { [key in keyof P]: AliasFN };

export type getAlisesProps = { [key: string]: any }

export interface OptionsProps<P = {}> {
   classPrefix?: string;
   breakpoints?: { [key: string]: number };
   aliases?: getAlisesProps;
   skipProps?: (prop: string, value: string | number) => boolean;
   getValue?: (value: string | number, prop: string, css: CSSProps) => (string | number);
   getProps?: (prop: string, value: string | number, css: CSSProps) => CSSProps<P> | void;
}