import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { css, globalCss, classNames } from '../src'
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
		breakpoints: {
			sm: 700,
			md: 900,
			lg: 1190,
			xs: 500,
		},
	}

	globalCss<{}>("global", {
		"*": {
			margin: 0,
			padding: 0
		}
	})

	const cls = css<{}>({
		height: 200,
		background: "orange",
		'& p, & div': {
			color: "yello",
			"& button, & a": {
				fontSize: 1,
				"& span": {
					border: 0
				}
			}
		}
	}, _options)



	return (
		<div className={cls}>
			wellcome
		</div>
	);
};


ReactDOM.render(<App />, document.getElementById('root'));
