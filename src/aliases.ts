import { AliasFN, AliasesPops } from './types'

const isStr = (v: any, or: any) => typeof v === 'string' ? v : or

const aliases: { [key in keyof AliasesPops]: string | AliasFN } = {
   bgcolor: "background-color",
   bgimage: (v) => ({ backgroundImage: `url(${v})` }),
   bgsize: 'background-size',
   bgposition: 'background-position',
   bgrepeat: 'background-repeat',
   bg: 'bakground',
   p: "padding",
   pt: "padding-top",
   pr: "padding-right",
   pb: "padding-bottom",
   pl: "padding-left",
   px: (v) => ({ paddingLeft: isStr(v, 8 * v), paddingRight: isStr(v, 8 * v) }),
   py: (v) => ({ paddingTop: isStr(v, 8 * v), paddingBottom: isStr(v, 8 * v) }),
   m: "margin",
   mt: "margin-top",
   mr: "margin-right",
   mb: "margin-bottom",
   ml: "margin-left",
   mx: (v) => ({ marginLeft: isStr(v, 8 * v), marginRight: isStr(v, 8 * v) }),
   my: (v) => ({ marginTop: isStr(v, 8 * v), marginBottom: isStr(v, 8 * v) }),
   size: (v) => ({ width: isStr(v, 8 * v), height: isStr(v, 8 * v) }),
   radius: (v) => ({ borderRadius: isStr(v, 8 * v) }),
   shadow: "box-shadow",
};

export default aliases