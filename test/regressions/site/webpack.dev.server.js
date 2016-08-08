// @flow weak

const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const webpackConfig = require('./webpack.dev.config');

const serverOptions = {
  publicPath: webpackConfig.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: { colors: true },
};

new WebpackDevServer(webpack(webpackConfig), serverOptions)
  .listen(3000, '0.0.0.0', (err) => {
    if (err) {
      return console.log(err); // eslint-disable-line no-console
    }

    return console.info('Webpack dev server listening at http://0.0.0.0:3000/'); // eslint-disable-line no-console
  });
