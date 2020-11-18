const fse = require('fs-extra');
const path = require('path');
const { promisify } = require('util');
const webpackCallbackBased = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const createWebpackConfig = require('./webpack.config');

const webpack = promisify(webpackCallbackBased);

async function run() {
  await fse.mkdirp(path.join(__dirname, 'build'));

  const config = await createWebpackConfig(webpack);
  config.plugins.push(new BundleAnalyzerPlugin());

  await webpack(config);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
