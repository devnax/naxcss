import aliases from './aliases'
import Factory from './Factory';
import { CSSObject } from './types'
import { OptionsProps } from './types'
export * from './types'
const isObject = (v: any) => typeof v === "object" && !Array.isArray(v);
const uid = () => Math.random().toString(36).substring(2, 8);
const CACHE = new Map<string, Factory>();

const formatePropName = (name: string) =>
	name
		.split(/(?=[A-Z])/)
		.join("-")
		.toLowerCase();


const val_formate = (val: any, key: string) => {
	if (!isNaN(val) && !(key === "font-weight" || key === "line-height")) {
		val = `${val}px`;
	}
	return val
}

const hasBreakpoint = (value: { [k: string]: any }, options?: OptionsProps) => {
	return options?.breakpoints && Object.keys(options.breakpoints).includes(Object.keys(value)[0])
}


const createBreakpoint = (prop: string, value: { [k: string]: any }, factory: Factory) => {
	const options = factory.options as OptionsProps
	prop = formatePropName(prop)
	for (let bname in value) {
		const bnum = options.breakpoints[bname]
		if (bnum !== undefined) {
			let bval = val_formate(value[bname], prop)
			factory.setMedia(bnum, make_css(prop, bval, factory))
		}
	}

}

const make_css = (key: string, val: string | number, factory: Factory) => {
	const options = factory.options
	const _aliases: any = (options?.getAliases && options?.getAliases(aliases)) || aliases
	let alias = _aliases[key]
	let f: any = {}
	if (typeof alias === "function") {
		const alisa_ob = alias(val, key)
		for (let askey in alisa_ob) {
			let asval = (alisa_ob as any)[askey]
			askey = formatePropName(askey)
			asval = val_formate(asval, askey)
			f[askey] = `${askey}: ${asval}`
		}
	} else {
		key = formatePropName(alias || key)
		val = val_formate(val, key)
		f[key] = `${key}: ${val}`
	}
	return f
}


const css_process = (_css: Partial<CSSObject>, factory?: Factory, options?: OptionsProps) => {
	if (!factory) {
		const cache_key = JSON.stringify(_css)
		let hasFactory = CACHE.get(cache_key)
		if (hasFactory) {
			return hasFactory
		}
		factory = new Factory
		factory.id = (options?.classPrefix || "css-") + uid()
		factory.current_cls = factory.id
		factory.options = options as OptionsProps
		CACHE.set(cache_key, factory)
	}

	factory = factory as Factory

	for (let prop in _css) {
		const val: any = _css[prop]
		if (!(options?.getProp && options?.getProp(prop, val))) {
			continue;
		}

		if (isObject(val)) {
			if (hasBreakpoint(val, options)) {
				createBreakpoint(prop, val, factory)
			} else {
				factory.current_cls = prop.replace("&", factory.current_cls)
				css_process(val, factory, options)
			}
		} else {
			factory.setCSS(make_css(prop, val, factory))
		}
	}

	return factory
}

export const css = (_css: CSSObject, options?: OptionsProps) => {
	const factory = css_process(_css, undefined, options)
	if (!factory.generated) {
		factory.generate()
	}
	return factory.id
}