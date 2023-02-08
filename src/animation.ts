import { AnimationPropsType, AnimationCallbackType, AnimationFuncReturnType } from './types'
import { keyframes, css } from '.'

export const animation = (props: AnimationPropsType, cb: AnimationCallbackType): AnimationFuncReturnType => {
    const state = {
        in: false
    }
    return {
        isIn: () => state.in,
        in: () => {
            const { duration, ...enterCss } = props.enter
            const dur = duration || props.duration || 300

            const framcls = keyframes({
                from: props.init,
                to: enterCss
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
                cb({ type: "entered", classname: css(props.entered || enterCss) })
            }, dur);
        },
        out: () => {
            const { duration, ...exitCss } = props.exit
            const dur = duration || props.duration || 300

            const framcls = keyframes({
                from: props.enter,
                to: exitCss
            })
            const _animcss = css({
                animationDuration: `${dur}ms`,
                animationTimingFunction: "cubic-bezier(0.165, 0.840, 0.440, 1.000)"
            })

            cb({ type: "exit", classname: _animcss + " " + framcls })

            setTimeout(() => {
                state.in = false
                cb({ type: "exited", classname: css(props.exited || exitCss) })
            }, dur);
        }
    }
}
