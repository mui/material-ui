import pluginTester from 'babel-plugin-tester';
import * as path from 'path';
// eslint-disable-next-line import/no-unresolved
import materialUI from '../dist';

pluginTester({
  plugin: materialUI,
  endOfLine: 'preserve',
  fixtures: path.join(__dirname, '__fixtures__'),
  babelOptions: {
    root: __dirname,
    babelrc: false,
    configFile: false,
  },
});
