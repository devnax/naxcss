import aliases from './aliases'
import Factory from './Factory';
import { CSSObject, CSSValueType } from './types'
import { OptionsProps } from './types'
export * from './types'
const isObject = (v: any) => typeof v === "object" && !Array.isArray(v);
const uid = () => Math.random().toString(36).substring(2, 8);
const CACHE = new Map<string, Factory<any>>();

const formatePropName = (name: string) => name.split(/(?=[A-Z])/).join("-").toLowerCase();


const numval_keys = ["font-weight", "line-height", "opacity", "z-index", "flex", "order"]
const val_formate = (val: any, key: string) => {
	if (typeof val === 'number' && !numval_keys.includes(key)) {
		val = `${val}px`;
	}
	return val
}

const hasBreakpoint = <Value>(value: { [k: string]: any }, options?: OptionsProps<Value>) => {
	return options?.breakpoints && Object.keys(options.breakpoints).includes(Object.keys(value)[0])
}


const createBreakpoint = <Value, Alias>(prop: string, value: { [k: string]: any }, factory: Factory<Value, Alias>) => {
	const options = factory.options as Required<OptionsProps<Value>>
	prop = formatePropName(prop)
	for (let bname in value) {
		const bnum = options.breakpoints[bname]
		if (bnum !== undefined) {
			let bval = val_formate(value[bname], prop)
			factory.setMedia(bnum, make_css(prop, bval, factory))
		}
	}

}

const make_css = <Value, Alias>(key: string, val: string | number, factory: Factory<Value, Alias>) => {
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


const css_process = <Value, Alias>(_css: Partial<CSSObject<Value, Alias>>, factory?: Factory<Value, Alias>, options?: OptionsProps<Value>) => {
	if (!factory) {
		const cache_key = JSON.stringify(_css)
		let hasFactory = CACHE.get(cache_key)
		if (hasFactory) {
			return hasFactory
		}
		factory = new Factory<Value, Alias>()
		factory.id = (options?.classPrefix || "css-") + uid()
		factory.current_cls = factory.id
		factory.options = options as OptionsProps<Value>
		CACHE.set(cache_key, factory)
	}

	factory = factory as Factory<Value, Alias>

	for (let prop in _css) {
		const val: any = (_css as any)[prop]
		if ((options?.getProp && options?.getProp(prop, val)) === false) {
			continue;
		}

		if (isObject(val)) {
			if (hasBreakpoint<Value>(val, options)) {
				createBreakpoint<Value, Alias>(prop, val, factory)
			} else {
				factory.current_cls = prop.replace("&", factory.current_cls)
				css_process<Value, Alias>(val, factory, options)
			}
		} else {
			factory.setCSS(make_css<Value, Alias>(prop, val, factory))
		}
	}

	return factory
}


export const css = <Value = {}, Alias = { [key: string]: CSSValueType<Value> | any }>(_css: CSSObject<Value, Alias>, options?: OptionsProps<Value>) => {
	const factory = css_process<Value, Alias>(_css, undefined, options)
	if (!factory.generated) {
		factory.generate()
		options?.getFactory && options.getFactory(factory)
	}
	return factory.id
}