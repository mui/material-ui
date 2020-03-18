const path = require('path');
const webpack = require('webpack');
const webpackBaseConfig = require('../../docs/webpackBaseConfig');

module.exports = {
  ...webpackBaseConfig,
  entry: path.resolve(__dirname, 'index.js'),
  mode: 'development',
  output: {
    path: path.resolve(__dirname, '../../tmp'),
    filename: 'tests.js',
  },
  // Avoid bundling the whole @material-ui/icons package. x2 the bundling speed.
  plugins: [new webpack.IgnorePlugin(/material-icons\/SearchIcons\.js/)],
  module: {
    ...webpackBaseConfig.module,
    rules: webpackBaseConfig.module.rules.concat([
      {
        test: /\.(jpg|gif|png)$/,
        loader: 'url-loader',
      },
    ]),
  },
};
