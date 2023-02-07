import defaultAliases from './aliases'
import { CSSProps, OptionsProps, keyframesType } from './types';
import { withPrefix } from './prefix'
export * from './types'

const CACHE = new Map<string, string>();
const number_val_props = ["fontWeight", "lineHeight", "opacity", "zIndex", "flex", "order"]
const formatPropName = (name: string) => name.split(/(?=[A-Z])/).join("-").toLowerCase();
const formatValue = (val: any, key: string) => {
	return typeof val === 'number' && !number_val_props.includes(key) ? `${val}px` : val
}




export const generateCss = (_css: any, baseClass: string, _aliases = defaultAliases, options?: OptionsProps) => {
	let stack: any = []
	let main_css: any = ''

	for (let propName in _css) {
		const cssval = (_css as any)[propName]
		if (propName.startsWith("&")) {
			stack = [
				...stack,
				...generateCss(cssval, propName.replace('&', baseClass), _aliases, options)
			]
		} else {

			const name = formatPropName(propName)
			const aliasCallback = (_aliases as any)[propName]

			if (typeof cssval === "object" && !Array.isArray(cssval)) {
				// create media
				const breakpointKeys = Object.keys(options?.breakpoints || {})
				if (!options?.breakpoints || !breakpointKeys.length) {
					throw new Error(`Invaid Value ${propName}`);
				}
				let breakpoints: any = {}
				for (let bk in cssval) {
					if (breakpointKeys.includes(bk)) {
						breakpoints[bk] = options?.breakpoints[bk]
					}
				}

				breakpoints = Object.fromEntries(Object.entries(breakpoints).sort(([, a]: any, [, b]: any) => a - b))

				for (let breakpointKey of Object.keys(breakpoints).reverse()) {
					const breakpointNum = breakpoints[breakpointKey]
					const _mval = formatValue(cssval[breakpointKey], propName)
					let media = ''
					const aliasObject = aliasCallback && aliasCallback(_mval)
					if (aliasObject) {
						let alias_css = ''
						for (let askey in aliasObject) {
							alias_css += `${askey}:${formatValue(aliasObject[askey], askey)};`
						}
						media = `@media screen and (min-width: ${breakpointNum}px){.${baseClass}{${alias_css}}}`
					} else {
						media = `@media screen and (min-width: ${breakpointNum}px){.${baseClass}{${name}:${_mval}}}`
					}

					stack.push(media)
				}

			} else {
				const aliasObject = aliasCallback && aliasCallback(cssval)
				if (aliasObject) {
					for (let askey in aliasObject) {
						main_css += `${askey}:${formatValue(aliasObject[askey], askey)};`
					}
				} else {
					main_css += withPrefix(name, formatValue(cssval, propName)); // `${name}:${formatValue(cssval, propName)};`
				}
			}
		}
	}

	stack.push(`${baseClass ? "." + baseClass : ""}{${main_css}}`)

	return stack
}


const injectStyle = (_css: string) => {
	const tag = document.createElement("style");
	tag.innerHTML = _css
	// tag.setAttribute(`data-naxcss`, baseClass)
	document.head.append(tag)
}

export const css = (_css: CSSProps, options?: OptionsProps) => {
	const cacheKey = JSON.stringify(_css)
	let _bashClass = CACHE.get(cacheKey)
	if (_bashClass) {
		return _bashClass
	}
	let _aliases: any = defaultAliases
	if (options?.getAliases) {
		_aliases = options.getAliases(defaultAliases)
	}
	const id = Math.random().toString(36).substring(2, 8)
	const baseClass = (options?.classPrefix || "css-") + id
	const generated = generateCss(_css, baseClass, _aliases, options)
	CACHE.set(cacheKey, baseClass)
	injectStyle(generated.reverse().join(''))
	return baseClass
}


export const keyframes = (framesObject: keyframesType, options?: OptionsProps) => {
	const cacheKey = "keyframes_" + JSON.stringify(framesObject)
	let animName = CACHE.get(cacheKey)
	if (animName) {
		return animName
	}

	let all_frames: any = {}
	const id = Math.random().toString(36).substring(2, 8)

	for (let frameKey in framesObject) {
		const _css = framesObject[frameKey]
		const generated = generateCss(_css, id, defaultAliases, options).reverse()
		for (let i = 0; i < generated.length; i++) {
			const item = generated[i]
			const generated_class_name = item.split('{')[0]
			const animname: string = generated_class_name.replace(/ |\./g, '_')
			if (!all_frames[animname]) {
				all_frames[animname] = {
					frames: [],
					classname: generated_class_name.replace('.', '')
				}
			}
			all_frames[animname].frames.push(`${frameKey}${item.replace(generated_class_name, '')}`)
		}
	}
	let gen_frames = ''
	let gen_anim_css: any = {}
	for (let animname in all_frames) {
		const item = all_frames[animname]
		gen_frames += `@keyframes ${animname}{${item.frames.join('')}}`
		if (item.classname === id) {
			gen_anim_css['animationName'] = animname
		} else {
			const selector = "& " + item.classname.replace(id, '')
			if (!gen_anim_css[selector]) {
				gen_anim_css[selector] = {}
			}
			gen_anim_css[selector]["animationName"] = animname
		}
	}

	injectStyle(gen_frames);
	const cls = css(gen_anim_css)
	CACHE.set(cacheKey, cls)
	return cls
}


export const alpha = (hex: string, opacity: number) => {
	return hex + Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255).toString(16).toUpperCase();
}