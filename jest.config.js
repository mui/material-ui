const { defaults } = require('ts-jest/presets');
const path = require('path');

module.exports = {
	testEnvironment: 'node',
	transform: defaults.transform,
	testRegex: `test/index.test.ts$`,
	globals: {
		'ts-jest': {
			packageJson: path.join(__dirname, 'package.json'),
		},
	},
};
