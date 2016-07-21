const path = require('path');
const webpack = require('webpack');

module.exports = {
  debug: true,
  devtool: 'inline-source-map',
  context: path.resolve(__dirname),
  entry: {
    main: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:3000',
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
        loaders: ['babel'],
      },
      {
        test: /\.svg$/,
        loader: 'file',
        include: /assets\/images/,
      },
      {
        test: /\.md$/,
        loader: 'raw',
      },
      {
        test: /\.css$/,
        loader: 'style!css',
      },
    ],
  },
  resolve: {
    alias: {
      docs: path.resolve(__dirname, '../../docs'),
      'material-ui': path.resolve(__dirname, '../../src'),
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-a11y': path.resolve(__dirname, '../../node_modules/react-a11y'),
      lodash: path.resolve(__dirname, '../../node_modules/lodash'),
    },
  },
  progress: true,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};
