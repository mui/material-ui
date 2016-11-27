// @flow weak

const path = require('path');
const webpack = require('webpack');

module.exports = {
  debug: true,
  devtool: 'inline-source-map',
  context: path.resolve(__dirname),
  entry: {
    main: [
      'eventsource-polyfill', // hot reloading in IE
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://0.0.0.0:3000',
      'webpack/hot/only-dev-server',
      './src/index',
    ],
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/build/',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.(jpg|gif|png)$/,
        loader: 'file',
      },
    ],
  },
  resolve: {
    alias: {
      'material-ui': path.resolve(__dirname, '../../../src'),
    },
  },
  progress: true,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};
