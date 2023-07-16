import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { css, globalCss } from '../src'
// import { css } from '@emotion/css'

const parformance = () => {
	const before = Date.now();
	let limit = 2000
	for (let i = 0; i < limit; i++) {
		css<{}>({
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
	console.log(`loop ${limit} in `, (after - before) / 1000);
}
// parformance()



const App = () => {

	const _options = {
		beforeRender: (prop, val) => {
			if (prop === 'borderRadius') {
				return undefined
			}
			return val
		},
		breakpoints: {
			sm: 700,
			md: 900,
			lg: 1190,
			xs: 500,
		},
		getProps: (p, v) => {
			if (p === 'type') {
				return { fontSize: 20, color: "red", background: "green" }
			}
		}
	}

	globalCss<{}>("global", {
		"*": {
			margin: 0,
			padding: 0
		}
	})

	const cls = css<{}>({
		type: "red",
		height: 200,
		color: "#fff"
	}, _options)


	return (
		<div className={cls}>
			wellcome
		</div>
	);
};


ReactDOM.render(<App />, document.getElementById('root'));
