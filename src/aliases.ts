import { AliasFN, AliasesProps } from './types'

const isStr = (v: any, or: any) => typeof v === 'string' ? v : or

const aliases: { [key in keyof AliasesProps]: AliasFN } = {
   bgcolor: v => ({ "background-color": v }),
   bgImage: v => ({ backgroundImage: `url(${v})` }),
   bg: v => ({ 'background': v }),
   p: v => ({ paddingTop: isStr(v, 8 * v), paddingRight: isStr(v, 8 * v), paddingBottom: isStr(v, 8 * v), paddingLeft: isStr(v, 8 * v) }),
   pt: v => ({ paddingTop: isStr(v, 8 * v) }),
   pr: v => ({ paddingRight: isStr(v, 8 * v) }),
   pb: v => ({ paddingBottom: isStr(v, 8 * v) }),
   pl: v => ({ paddingLeft: isStr(v, 8 * v) }),
   px: v => ({ paddingLeft: isStr(v, 8 * v), paddingRight: isStr(v, 8 * v) }),
   py: v => ({ paddingTop: isStr(v, 8 * v), paddingBottom: isStr(v, 8 * v) }),
   m: v => ({ marginTop: isStr(v, 8 * v), marginRight: isStr(v, 8 * v), marginBottom: isStr(v, 8 * v), marginLeft: isStr(v, 8 * v) }),
   mt: v => ({ marginTop: isStr(v, 8 * v) }),
   mr: v => ({ marginRight: isStr(v, 8 * v) }),
   mb: v => ({ marginBottom: isStr(v, 8 * v) }),
   ml: v => ({ marginLeft: isStr(v, 8 * v) }),
   mx: v => ({ marginLeft: isStr(v, 8 * v), marginRight: isStr(v, 8 * v) }),
   my: v => ({ marginTop: isStr(v, 8 * v), marginBottom: isStr(v, 8 * v) }),
   radius: v => ({ borderRadius: isStr(v, 8 * v) }),
   shadow: v => ({ "box-shadow": v }),

   w: v => ({ "width": v }),
   h: v => ({ "height": v }),
   maxw: v => ({ "max-width": v }),
   minw: v => ({ "min-width": v }),
   maxh: v => ({ "max-height": v }),
   minh: v => ({ "min-height": v }),

   flexBox: v => (v ? { display: "flex" } : {}),
   flexRow: v => (v ? { flexDirection: "row" } : {}),
   flexColumn: v => (v ? { flexDirection: "column" } : {}),
   flexWraped: v => (v ? { flexWrap: "wrap" } : {}),
   direction: v => ({ "flexDirection": v }),
   justifyStart: v => (v ? { justifyContent: "flex-start" } : {}),
   justifyEnd: v => (v ? { justifyContent: "flex-end" } : {}),
   justifyCenter: v => (v ? { justifyContent: "center" } : {}),
   justifyBetween: v => (v ? { justifyContent: "space-between" } : {}),
   justifyAround: v => (v ? { justifyContent: "space-around" } : {}),
   justifyEvenly: v => (v ? { justifyContent: "space-evenly" } : {}),

   itemsStart: v => (v ? { alignItems: "flex-start" } : {}),
   itemsEnd: v => (v ? { alignItems: "flex-end" } : {}),
   itemsCenter: v => (v ? { alignItems: "flex-center" } : {}),
   itemsStretch: v => (v ? { alignItems: "flex-stretch" } : {}),
   itemsBetween: v => (v ? { alignItems: "flex-between" } : {}),
   itemsAround: v => (v ? { alignItems: "flex-around" } : {}),

   contentStart: v => (v ? { alignContent: "flex-start" } : {}),
   contentEnd: v => (v ? { alignContent: "flex-end" } : {}),
   contentCenter: v => (v ? { alignContent: "flex-center" } : {}),
   contentStretch: v => (v ? { alignContent: "flex-stretch" } : {}),
   contentBetween: v => (v ? { alignContent: "flex-between" } : {}),
   contentAround: v => (v ? { alignContent: "flex-around" } : {}),
};

export default aliases