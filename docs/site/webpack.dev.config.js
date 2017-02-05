// @flow weak

const path = require('path');
const webpack = require('webpack');
const dllManifest = require('./build/dll.manifest.json');

module.exports = {
  cache: true,
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
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.svg$/,
        loader: 'file-loader',
      },
      {
        test: /\.(jpg|gif|png)$/,
        loader: 'file-loader!img-loader',
      },
      {
        test: /\.md$/,
        loader: 'raw-loader',
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
    ],
  },
  resolve: {
    alias: {
      docs: path.resolve(__dirname, '../../docs'),
      'material-ui': path.resolve(__dirname, '../../src'),
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: dllManifest,
    }),
    new webpack.NamedModulesPlugin(),
  ],
};
