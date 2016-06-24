const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const webpackConfig = require('./webpack.dev.config');

const serverOptions = {
  publicPath: webpackConfig.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: {colors: true},
};

new WebpackDevServer(webpack(webpackConfig), serverOptions)
  .listen(3000, 'localhost', (err) => {
    if (err) {
      return console.log(err); // eslint-disable-line no-console
    }

    return console.info('Webpack dev server listening at http://localhost:3000/'); // eslint-disable-line no-console
  });
