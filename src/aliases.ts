import { AliasFN, AliasesProps } from './types'

const isStr = (v: any, or: any) => typeof v === 'string' ? v : or

const aliases: { [key in keyof AliasesProps<any>]: string | AliasFN } = {
   bgColor: "background-color",
   bgImage: (v) => ({ backgroundImage: `url(${v})` }),
   bgSize: 'background-size',
   bgPosition: 'background-position',
   bgRepeat: 'background-repeat',
   bg: 'background',
   p: (v) => ({ paddingTop: isStr(v, 8 * v), paddingRight: isStr(v, 8 * v), paddingBottom: isStr(v, 8 * v), paddingLeft: isStr(v, 8 * v) }),
   pt: (v) => ({ paddingTop: isStr(v, 8 * v) }),
   pr: (v) => ({ paddingRight: isStr(v, 8 * v) }),
   pb: (v) => ({ paddingBottom: isStr(v, 8 * v) }),
   pl: (v) => ({ paddingLeft: isStr(v, 8 * v) }),
   px: (v) => ({ paddingLeft: isStr(v, 8 * v), paddingRight: isStr(v, 8 * v) }),
   py: (v) => ({ paddingTop: isStr(v, 8 * v), paddingBottom: isStr(v, 8 * v) }),
   m: (v) => ({ marginTop: isStr(v, 8 * v), marginRight: isStr(v, 8 * v), marginBottom: isStr(v, 8 * v), marginLeft: isStr(v, 8 * v) }),
   mt: (v) => ({ marginTop: isStr(v, 8 * v) }),
   mr: (v) => ({ marginRight: isStr(v, 8 * v) }),
   mb: (v) => ({ marginBottom: isStr(v, 8 * v) }),
   ml: (v) => ({ marginLeft: isStr(v, 8 * v) }),
   mx: (v) => ({ marginLeft: isStr(v, 8 * v), marginRight: isStr(v, 8 * v) }),
   my: (v) => ({ marginTop: isStr(v, 8 * v), marginBottom: isStr(v, 8 * v) }),
   size: (v) => ({ width: isStr(v, 8 * v), height: isStr(v, 8 * v) }),
   radius: (v) => ({ borderRadius: isStr(v, 8 * v) }),
   shadow: "box-shadow",

   w: "width",
   h: "height",
   maxw: "max-width",
   minw: "min-width",
   maxh: "max-height",
   minh: "min-height",

   flexBox: () => ({ display: "flex" }),
   flexRow: () => ({ flexDirection: "row" }),
   flexColumn: () => ({ flexDirection: "column" }),
   flexWraped: () => ({ flexWrap: "wrap" }),
   direction: "flexDirection",
   justifyStart: () => ({ justifyContent: "flex-start" }),
   justifyEnd: () => ({ justifyContent: "flex-end" }),
   justifyCenter: () => ({ justifyContent: "center" }),
   justifyBetween: () => ({ justifyContent: "space-between" }),
   justifyAround: () => ({ justifyContent: "space-around" }),
   justifyEvenly: () => ({ justifyContent: "space-evenly" }),

   itemsStart: () => ({ alignItems: "flex-start" }),
   itemsEnd: () => ({ alignItems: "flex-end" }),
   itemsCenter: () => ({ alignItems: "flex-center" }),
   itemsStretch: () => ({ alignItems: "flex-stretch" }),
   itemsBetween: () => ({ alignItems: "flex-between" }),
   itemsAround: () => ({ alignItems: "flex-around" }),

   contentStart: () => ({ alignContent: "flex-start" }),
   contentEnd: () => ({ alignContent: "flex-end" }),
   contentCenter: () => ({ alignContent: "flex-center" }),
   contentStretch: () => ({ alignContent: "flex-stretch" }),
   contentBetween: () => ({ alignContent: "flex-between" }),
   contentAround: () => ({ alignContent: "flex-around" }),
};

export default aliases