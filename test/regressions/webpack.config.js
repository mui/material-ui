/* eslint-disable flowtype/require-valid-file-annotation */

const path = require('path');
const webpackBaseConfig = require('../../docs/webpackBaseConfig');

module.exports = Object.assign({}, webpackBaseConfig, {
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    path: path.resolve(__dirname, '../../tmp'),
    filename: 'tests.js',
  },
  module: Object.assign({}, webpackBaseConfig.module, {
    rules: webpackBaseConfig.module.rules.concat([
      {
        test: /\.(jpg|gif|png)$/,
        loader: 'url-loader',
      },
    ]),
  }),
});
