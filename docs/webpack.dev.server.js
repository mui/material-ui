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
    // Remove built modules information.
    modules: false,
    // Remove built modules information to chunk information.
    chunkModules: false,
    colors: true,
  },
};

const PORT = process.env.MATERIAL_UI_PORT || 3000;

new WebpackDevServer(webpack(webpackConfig), serverOptions).listen(PORT, '0.0.0.0', err => {
  if (err) {
    return console.log(err);
  }

  return console.info(`Webpack dev server listening at http://0.0.0.0:${PORT}/`);
});
