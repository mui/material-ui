var webpack = require('webpack');
var webpackConfig = require('./webpack.base');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CompressionPlugin = require("compression-webpack-plugin");

webpackConfig.debug = true;
webpackConfig.devtool = 'source-map'

webpackConfig.plugins = [
  new webpack.DefinePlugin({
	'process.env': { 'EXPRESS_API_URL': JSON.stringify(process.env.EXPRESS_API_URL) },
	NODE_ENV: "'development'"
  }),
  new ExtractTextPlugin("style.css")
];

webpackConfig.module.preLoaders = [
  { test: /\.jsx$/, exclude: /node_modules/, loader: 'jsxhint' },
];

module.exports = webpackConfig;
