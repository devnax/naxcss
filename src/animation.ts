import { AnimationCSSProps, AnimationPropsType, AnimationCallbackType, AnimationFuncReturnType } from './types'
import { keyframes, css } from '.'


const formatProps = (p: AnimationCSSProps) => {
    const { duration, scale, rotate, skew, perspective, x, y, ...rest } = p as any
    rest.transform = rest.transform || ""
    scale && (rest.transform += typeof scale === "number" ? ` scale(${scale})` : scale)
    rotate && (rest.transform += typeof rotate === "number" ? ` rotate(${rotate}deg)` : rotate)
    skew && (rest.transform += typeof skew === "number" ? ` skew(${skew}deg)` : skew)
    perspective && (rest.transform += typeof perspective === "number" ? ` perspective(${perspective}px)` : perspective)

    let translate = ''
    x && (translate += typeof x === 'number' ? ` ${x}px` : x)
    y && (translate += typeof y === 'number' ? ` ${y}px` : y)
    translate && (rest.transform += ` translate(${translate.trim().split(' ').join(',')})`)

    return {
        duration,
        css: rest
    }
}

export const animation = (props: AnimationPropsType, cb: AnimationCallbackType): AnimationFuncReturnType => {
    const state = {
        in: false
    }
    return {
        isIn: () => state.in,
        in: () => {
            const enter = formatProps(props.enter)
            const dur = enter.duration || props.duration || 300

            const framcls = keyframes({
                from: formatProps(props.init).css,
                to: enter.css
            })

            const _animcss = css({
                animationDuration: `${dur}ms`,
                animationTimingFunction: "cubic-bezier(0.165, 0.840, 0.440, 1.000)"
            })

            cb({
                type: "enter",
                classname: _animcss + " " + framcls
            })

            setTimeout(() => {
                state.in = true
                const enteredcss = props.entered && formatProps(props.entered).css
                cb({ type: "entered", classname: css(enteredcss || enter.css) })
            }, dur);
        },
        out: () => {
            const exit = formatProps(props.exit)
            const dur = exit.duration || props.duration || 300

            const framcls = keyframes({
                from: formatProps(props.enter).css,
                to: exit.css
            })
            const _animcss = css({
                animationDuration: `${dur}ms`,
                animationTimingFunction: "cubic-bezier(0.165, 0.840, 0.440, 1.000)"
            })

            cb({ type: "exit", classname: _animcss + " " + framcls })

            setTimeout(() => {
                state.in = false
                const exitedcss = props.exited && formatProps(props.exited).css
                cb({ type: "exited", classname: css(exitedcss || exit.css) })
            }, dur);
        }
    }
}
