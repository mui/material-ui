const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
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
    // Avoid bundling the whole @mui/icons-material package. x2 the bundling speed.
    new webpack.IgnorePlugin(/material-icons\/SearchIcons\.js/),
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
  resolve: {
    ...webpackBaseConfig.resolve,
    alias: {
      ...webpackBaseConfig.resolve.alias,
      '@material-ui/core': path.resolve(__dirname, '../../packages/material-ui/src'),
      '@material-ui/styles': path.resolve(__dirname, '../../packages/material-ui-styles/src'),
    },
  },
};
