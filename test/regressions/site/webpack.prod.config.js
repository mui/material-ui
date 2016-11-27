// @flow weak

const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  context: path.resolve(__dirname),
  entry: {
    main: [
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
      react: path.resolve(__dirname, '../../../node_modules/react'),
    },
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
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
