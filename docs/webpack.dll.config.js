// @flow weak
const path = require('path');
const webpack = require('webpack');
const packageJson = require('./package.json');
const packageJsonSrc = require('../package.json');

const excludedDeps = ['lodash', 'recompose', 'object-assign', 'material-ui-icons', 'babel-runtime'];

const deps = [
  'react-hot-loader/index',
  'react-hot-loader/patch',
  'eventsource-polyfill',
  'webpack-dev-server/client',
  'react-addons-perf',
  'webpack/hot/log-apply-result',
  'webpack-dev-server/client/index',
]
  .concat(Object.keys(packageJson.dependencies))
  .concat(Object.keys(packageJsonSrc.dependencies))
  .concat(Object.keys(packageJsonSrc.peerDependencies))
  .filter(dep => {
    return excludedDeps.indexOf(dep) === -1;
  });

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    lib: deps,
  },
  output: {
    filename: 'dll.bundle.js',
    path: path.join(__dirname, 'build'),
    library: 'dll',
  },
  plugins: [
    new webpack.DllPlugin({
      name: 'dll',
      path: 'build/dll.manifest.json',
    }),
  ],
};
