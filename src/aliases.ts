import { AliasFN, AliasesProps } from './types'

const isStr = (v: any, or: any) => typeof v === 'string' ? v : or

const aliases: { [key in keyof AliasesProps]: AliasFN } = {
   bgcolor: v => ({ "background-color": v }),
   bgImage: v => ({ "background-image": `url(${v})` }),
   bg: v => ({ 'background': v }),
   p: v => ({ "padding-top": isStr(v, 8 * v), "padding-right": isStr(v, 8 * v), "padding-bottom": isStr(v, 8 * v), "padding-left": isStr(v, 8 * v) }),
   pt: v => ({ "padding-top": isStr(v, 8 * v) }),
   pr: v => ({ "padding-right": isStr(v, 8 * v) }),
   pb: v => ({ "padding-bottom": isStr(v, 8 * v) }),
   pl: v => ({ "padding-left": isStr(v, 8 * v) }),
   px: v => ({ "padding-left": isStr(v, 8 * v), "padding-right": isStr(v, 8 * v) }),
   py: v => ({ "padding-top": isStr(v, 8 * v), "padding-bottom": isStr(v, 8 * v) }),
   m: v => ({ "margin-top": isStr(v, 8 * v), "margin-right": isStr(v, 8 * v), "margin-bottom": isStr(v, 8 * v), "margin-left": isStr(v, 8 * v) }),
   mt: v => ({ "margin-top": isStr(v, 8 * v) }),
   mr: v => ({ "margin-right": isStr(v, 8 * v) }),
   mb: v => ({ "margin-bottom": isStr(v, 8 * v) }),
   ml: v => ({ "margin-left": isStr(v, 8 * v) }),
   mx: v => ({ "margin-left": isStr(v, 8 * v), "margin-right": isStr(v, 8 * v) }),
   my: v => ({ "margin-top": isStr(v, 8 * v), "margin-bottom": isStr(v, 8 * v) }),
   radius: v => ({ "border-radius": isStr(v, 8 * v) }),
   shadow: v => ({ "box-shadow": v }),

   w: v => ({ "width": v }),
   h: v => ({ "height": v }),
   maxw: v => ({ "max-width": v }),
   minw: v => ({ "min-width": v }),
   maxh: v => ({ "max-height": v }),
   minh: v => ({ "min-height": v }),

   flexBox: v => (v ? { "display": "flex" } : {}),
   flexRow: v => (v ? { "flex-direction": "row" } : {}),
   flexColumn: v => (v ? { "flex-direction": "column" } : {}),
   flexWraped: v => (v ? { "flex-wrap": "wrap" } : {}),
   direction: v => ({ "flex-direction": v }),
   justifyStart: v => (v ? { "justify-content": "flex-start" } : {}),
   justifyEnd: v => (v ? { "justify-content": "flex-end" } : {}),
   justifyCenter: v => (v ? { "justify-content": "center" } : {}),
   justifyBetween: v => (v ? { "justify-content": "space-between" } : {}),
   justifyAround: v => (v ? { "justify-content": "space-around" } : {}),
   justifyEvenly: v => (v ? { "justify-content": "space-evenly" } : {}),

   itemsStart: v => (v ? { "align-items": "flex-start" } : {}),
   itemsEnd: v => (v ? { "align-items": "flex-end" } : {}),
   itemsCenter: v => (v ? { "align-items": "center" } : {}),
   itemsStretch: v => (v ? { "align-items": "flex-stretch" } : {}),
   itemsBetween: v => (v ? { "align-items": "flex-between" } : {}),
   itemsAround: v => (v ? { "align-items": "flex-around" } : {}),

   contentStart: v => (v ? { "align-content": "flex-start" } : {}),
   contentEnd: v => (v ? { "align-content": "flex-end" } : {}),
   contentCenter: v => (v ? { "align-content": "center" } : {}),
   contentStretch: v => (v ? { "align-content": "flex-stretch" } : {}),
   contentBetween: v => (v ? { "align-content": "flex-between" } : {}),
   contentAround: v => (v ? { "align-content": "flex-around" } : {}),
};

export default aliases