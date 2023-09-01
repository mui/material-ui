const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          configFile: path.resolve(__dirname, '../../babel.config.js'),
          envName: 'regressions',
        },
      },
      {
        test: /\.(jpg|gif|png)$/,
        type: 'asset/inline',
      },
    ],
  },
  // TODO: 'browserslist:modern'
  target: 'web',
};
