const path = require('path');
const webpack = require('webpack');

module.exports = {
  colors: true,
  progress: true,
  devtool: 'source-map',
  context: path.resolve(__dirname),
  entry: {
    'main': [
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
      'docs': path.resolve(__dirname, '../../docs'),
      'material-ui': path.resolve(__dirname, '../../src'),
      react: path.resolve('./node_modules/react'),
      lodash: path.resolve(__dirname, '../../node_modules/lodash'),
    },
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
};
