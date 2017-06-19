// @flow weak
/* eslint-disable import/no-unresolved */

const webpack = require('webpack');
const webpackBaseConfig = require('./webpackBaseConfig');
const dllManifest = require('./build/dll.manifest.json');

const PORT = process.env.MATERIAL_UI_PORT || 3000;

module.exports = Object.assign({}, webpackBaseConfig, {
  cache: true,
  devtool: 'inline-source-map',
  entry: {
    main: [
      'eventsource-polyfill', // hot reloading in IE
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://0.0.0.0:${PORT}`,
      'webpack/hot/only-dev-server',
      './src/index',
    ],
  },
  module: Object.assign({}, webpackBaseConfig.module, {
    rules: webpackBaseConfig.module.rules.concat([
      {
        test: /\.(jpg|gif|png)$/,
        loader: 'file-loader',
      },
    ]),
  }),
  plugins: webpackBaseConfig.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: dllManifest,
    }),
    new webpack.NamedModulesPlugin(),
  ]),
});
