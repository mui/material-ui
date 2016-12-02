// @flow weak
/* eslint-disable no-console */

const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const webpackConfig = require('./webpack.dev.config');

const serverOptions = {
  publicPath: webpackConfig.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: {
    modules: false,
    chunks: false,
    chunkModules: false,
    colors: true,
  },
};

new WebpackDevServer(webpack(webpackConfig), serverOptions)
  .listen(3333, '0.0.0.0', (err) => {
    if (err) {
      return console.log(err);
    }

    return console.info('Webpack dev server listening at http://0.0.0.0:3333/');
  });
