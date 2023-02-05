import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { css, keyframes } from '../src'
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

	const _options = {
		breakpoints: {
			sm: 700,
			md: 900,
			lg: 1190,
			xs: 500,
		}
	}


	const framclass = keyframes({
		"0%": {
			transform: "scale(.8)",
			opacity: 0
		},

		'100%': {
			transform: "scale(1)",
			opacity: 1
		}
	})

	const className = css({
		position: "fixed",
		left: "0",
		top: "0",
		width: "100%",
		height: "100%",
		bgcolor: "red",
		flexBox: true,
		justifyCenter: true,
		itemsCenter: true,
		animationDuration: ".1s",
		animationTimingFunction: "linear",
	}, _options)

	return (
		<div className={(show ? className + ' ' + framclass : "")}>
			<button onClick={() => {
				setShow(!show)
			}}>Toggle</button>
		</div>
	);
};


ReactDOM.render(<App />, document.getElementById('root'));
