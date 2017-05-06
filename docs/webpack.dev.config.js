// @flow weak

const webpack = require('webpack');
const webpackBaseConfig = require('./webpackBaseConfig');
const dllManifest = require('./build/dll.manifest.json');

module.exports = Object.assign({}, webpackBaseConfig, {
  cache: true,
  devtool: 'inline-source-map',
  entry: {
    main: [
      'eventsource-polyfill', // hot reloading in IE
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://0.0.0.0:3000',
      'webpack/hot/only-dev-server',
      './src/index',
    ],
  },
  module: Object.assign({}, webpackBaseConfig.module, {
    rules: webpackBaseConfig.module.rules.concat([
      {
        test: /\.(jpg|gif|png)$/,
        loader: 'file-loader!img-loader',
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
