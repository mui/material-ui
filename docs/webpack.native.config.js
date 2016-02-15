'use strict';

const path = require('path');

module.exports = {
  debug: true,
  devtool: 'source-map',
  entry: {
    'index.ios': ['./src/app/app.ios.js'],
    'index.android': ['./src/app/app.android.js'],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
  },
  resolve: {
    alias: {
      'material-ui/lib': path.resolve(__dirname, '../src'),
    },
    extensions: ['.native.jsx', '', '.js', '.jsx'],
    modulesDirectories: [
      path.resolve(__dirname, 'node_modules'),
    ],
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: /node_modules\/react-native/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: false,
          presets: ['es2015', 'stage-1', 'react'],
        },
      },
      {
        test: /\.(js|jsx|es6)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: false,
          presets: ['es2015', 'stage-1', 'react'],
        },
      },
    ],
  },
};
