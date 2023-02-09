import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { css, keyframes, animation } from '../src'
// import { css } from '@emotion/css'

const parformance = () => {
	const before = Date.now();
	for (let i = 0; i < 300; i++) {
		css({
			border: i,
			bgcolor: "red",
			'& div': {
				size: 100,
				"& p": {
					color: "#333",
					'&:hover': {
						px: 2,
						color: "yellow",
						bgcolor: 7
					},
					'& div': {
						size: 100,
						"& p": {
							color: "#333",
							'&:hover': {
								px: 2,
								color: "yellow",
								bgcolor: 7
							}
						},
						'& div': {
							size: 100,
							"& p": {
								color: "#333",
								'&:hover': {
									px: 2,
									color: "yellow",
									bgcolor: 7
								}
							}
						}
					}
				},
				'& div': {
					size: 100,
					"& p": {
						color: "#333",
						'&:hover': {
							px: 2,
							color: "yellow",
							bgcolor: 7
						},
						'& div': {
							size: 100,
							"& p": {
								color: "#333",
								'&:hover': {
									px: 2,
									color: "yellow",
									bgcolor: 7
								}
							}
						}
					}
				}
			}
		})
	}
	const after = Date.now();
	console.log('loop 20000 in ', (after - before) / 1000);
}
// parformance()



const App = () => {
	const [show, setShow] = React.useState(false)
	const [animcls, setAnimCls] = React.useState('')
	const ref: any = React.useRef()

	React.useEffect(() => {
		ref.current = animation({
			duration: 500,
			init: {
				scale: 1.2,
			},
			enter: {
				scale: 1,
				skew: 10
			},
			exit: {
				scale: 1.2,
				opacity: 0
			},
			// exited: {
			// 	bgcolor: "green"
			// }
		}, ({ type, classname }) => {
			setAnimCls(classname)
			if (type === 'enter') {
				setShow(true)
			} else if (type === 'exited') {
				setShow(false)
			}
		})
	}, [])


	const _options = {
		breakpoints: {
			sm: 700,
			md: 900,
			lg: 1190,
			xs: 500,
		}
	}


	// const framclass = keyframes({
	// 	"0%": {
	// 		transform: "scale(.8)",
	// 		opacity: 0,
	// 		"& button": {
	// 			width: 10,
	// 			height: 10
	// 		}
	// 	},

	// 	'100%': {
	// 		transform: "scale(1)",
	// 		opacity: 1,
	// 		"& button": {
	// 			width: 100,
	// 			height: 100
	// 		}
	// 	}
	// })

	// const className = css({
	// 	border: "2px solid",
	// 	position: "fixed",
	// 	left: 0,
	// 	top: 0,
	// 	width: "100%",
	// 	height: "100%",
	// 	bgcolor: "red",
	// 	flexBox: true,
	// 	justifyCenter: true,
	// 	itemsCenter: true,
	// 	animationDuration: ".1s",
	// 	animationTimingFunction: "linear",

	// 	'& button': {
	// 		animationDuration: "1s",
	// 		animationTimingFunction: "linear",
	// 		animationIterationCount: "infinite"
	// 	}
	// }, _options)

	const cls = css({
		borderRadius: 100,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		margin: "100px auto",
		position: "fixed",
		left: "50%",
		top: 100,
		width: 200,
		bgcolor: "red",
		height: 200,
	})

	return (
		<div>
			{
				show && <div className={cls + " " + animcls}>

				</div>
			}

			<button onClick={() => {
				ref.current.in()
			}}>In</button>
			<button onClick={() => {
				ref.current.out()
			}}>out</button>
		</div>
	);
};


ReactDOM.render(<App />, document.getElementById('root'));
