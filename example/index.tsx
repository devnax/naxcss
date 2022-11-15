import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { css } from '../src'
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


	css({
		border: 1,
		bgcolor: "red",
		"& div": {
			width: 100,
			'& p': {
				color: "red",
				textAlign: "center",
				'& span': {
					fontWeight: 500,
					'& b': {
						color: "#000"
					}
				}
			}
		}
	})


	const className = css({
		width: {
			sm: 300,
			xs: 100,
		},
		height: 100,
		bgcolor: {
			xs: "red",
			sm: "green",
			md: "yellow",
			lg: "blue"
		}
	}, {
		classPrefix: "nax-",
		getProp: (key) => {
			if (key === "id") {
				return false
			}
			return true
		},
		breakpoints: {
			xs: 0,
			sm: 500,
			md: 700,
			lg: 900,
			xl: 1024
		}
	})

	return (
		<div className={className}>
			Nice
		</div>
	);
};


ReactDOM.render(<App />, document.getElementById('root'));
