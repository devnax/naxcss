import * as React from 'react';
import * as ReactDOM from 'react-dom';
import css from '../src'
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


	const _options = {
		breakpoints: {
			sm: 700,
			md: 900,
			lg: 1190,
			xs: 500,
		}
	}

	const className = css({
		"& div p": {
			background: ""
		},
		width: {
			xs: 200,
			md: 400
		},
		height: 200,
		bgcolor: {
			md: "red",
			sm: "yellow",
			lg: "green",
		},
		lineHeight: 20,
		'& div': {
			width: 100,
			height: {
				lg: 500
			}
		},
	}, _options)

	return (
		<div className={"className"}>
			Nice
		</div>
	);
};


ReactDOM.render(<App />, document.getElementById('root'));
