const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpackBaseConfig = require('../../webpackBaseConfig');

module.exports = {
  ...webpackBaseConfig,
  entry: path.resolve(__dirname, 'index.js'),
  mode: process.env.NODE_ENV || 'development',
  optimization: {
    // Helps debugging and build perf.
    // Bundle size is irrelevant for local serving
    minimize: false,
  },
  output: {
    path: path.resolve(__dirname, './build'),
    publicPath: '/',
    filename: 'tests.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './template.html'),
    }),
  ],
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
