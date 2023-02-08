import * as CSS from 'csstype'

export type AliasesProps = {
   bgcolor?: CSS.Properties['background'];
   bgImage?: CSS.Properties['backgroundImage'];
   bgSize?: CSS.Properties['backgroundSize'],
   bgPosition?: CSS.Properties['backgroundPosition'],
   bgRepeat?: CSS.Properties['backgroundRepeat'],
   bg?: CSS.Properties['background'];
   p?: CSS.Properties['padding'];
   pt?: CSS.Properties['padding'];
   pr?: CSS.Properties['padding'];
   pb?: CSS.Properties['padding'];
   pl?: CSS.Properties['padding'];
   px?: CSS.Properties['padding'];
   py?: CSS.Properties['margin'];
   m?: CSS.Properties['margin'];
   mt?: CSS.Properties['margin'];
   mr?: CSS.Properties['margin'];
   mb?: CSS.Properties['margin'];
   ml?: CSS.Properties['margin'];
   mx?: CSS.Properties['margin'];
   my?: CSS.Properties['margin'];
   radius?: CSS.Properties['borderRadius'];
   shadow?: CSS.Properties['boxShadow'];

   w?: CSS.Properties["width"];
   h?: CSS.Properties["height"];
   maxw?: CSS.Properties["width"];
   minw?: CSS.Properties["width"];
   maxh?: CSS.Properties["height"];
   minh?: CSS.Properties["height"];

   flexBox?: boolean;
   direction?: boolean;
   flexRow?: boolean;
   flexColumn?: boolean;
   flexWraped?: boolean;
   justifyStart?: boolean;
   justifyEnd?: boolean;
   justifyCenter?: boolean;
   justifyBetween?: boolean;
   justifyAround?: boolean;
   justifyEvenly?: boolean;

   itemsStart?: boolean;
   itemsEnd?: boolean;
   itemsCenter?: boolean;
   itemsStretch?: boolean;
   itemsBetween?: boolean;
   itemsAround?: boolean;

   contentStart?: boolean;
   contentEnd?: boolean;
   contentCenter?: boolean;
   contentStretch?: boolean;
   contentBetween?: boolean;
   contentAround?: boolean;
}


export type Properties = CSS.Properties & AliasesProps
export type PropertieKeys = string & keyof Properties

export type CSSMap =
   | string
   | number
   | { [x: string]: CSSMap }
   | CSS.Properties
   | AliasesProps;

export type CSSKeyMap =
   | string
   | keyof CSS.Properties
   | keyof AliasesProps;

export type CSSProps = { [key in CSSKeyMap]?: CSSMap }

export type keyframesType = { [x: string]: CSSProps }

export type AliasFN = (v: any, k: string) => Partial<CSSProps>;
export type AliasObjectType = { [key in keyof AliasesProps]: AliasFN };

export type getAlisesProps = AliasesProps | { [key: string]: any }

export interface OptionsProps {
   getAliases?: (aliases: getAlisesProps) => getAlisesProps;
   classPrefix?: string;
   breakpoints?: { [key: string]: number };
}


export type AnimationCSSProps = CSSProps & {
   duration?: number;
}


export type AnimationFuncReturnType = {
   isIn: () => boolean;
   in: () => void;
   out: () => void;
}

export type AnimationPropsDirectory = "init" | "enter" | "entered" | "exit" | "exited"

export type AnimationPropsType = {
   duration?: number;
   init: AnimationCSSProps;
   enter: AnimationCSSProps;
   entered?: AnimationCSSProps;
   exit: AnimationCSSProps;
   exited?: AnimationCSSProps;
}

export type AnimationCallbackArgsType = {
   type: AnimationPropsDirectory,
   classname: string
}


export type AnimationCallbackType = (args: AnimationCallbackArgsType) => void;