'use strict';

const path = require('path');

module.exports = {
  debug: true,
  devtool: 'source-map',
  entry: {
    'index.ios': ['./src/main.ios.js'],
    'index.android': ['./src/main.android.js'],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
  },
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx|es6)$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'eslint-loader',
      },
    ],
    loaders: [
      {
        test: /\.js$/,
        include: /node_modules\/react-native/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'stage-1', 'react'],
        },
      },
      {
        test: /\.(js|jsx|es6)$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'stage-1', 'react'],
        },
      },
    ],
  },
};
