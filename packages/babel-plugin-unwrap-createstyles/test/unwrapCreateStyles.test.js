import pluginTester from 'babel-plugin-tester/pure';
import * as path from 'path';
import unwrapCreateStylesPlugin from '../src';

pluginTester({
  plugin: unwrapCreateStylesPlugin,
  pluginName: 'unwrapCreateStylesPlugin',
  endOfLine: 'preserve',
  fixtures: path.join(__dirname, '__fixtures__'),
  babelOptions: {
    root: __dirname,
  },
});
