import pluginTester from 'babel-plugin-tester/pure';
import * as path from 'path';
import plugin from 'babel-plugin-macros';

pluginTester({
  plugin,
  fixtures: path.resolve(__dirname, './__fixtures__'),
  babelOptions: {
    root: __dirname,
  },
});
