import pluginTester from 'babel-plugin-tester';
import * as path from 'path';
import setComponentName from '../src';

pluginTester({
  plugin: setComponentName,
  pluginName: 'setComponentName',
  fixtures: path.join(__dirname, '__fixtures__'),
  babelOptions: {
    root: __dirname,
  },
});
