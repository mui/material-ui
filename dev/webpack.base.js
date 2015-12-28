var webpack = require('webpack');
var path = require('path')
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  target: 'web',
  debug: false,
  devServer: {
    contentBase: './src/www'
  },
  entry: {
    app: [
      './src/app/app',
    ]
  },
  output: {
    path: path.join(__dirname, './src/www'),
    publicPath: '/',
    filename: '[name].js'
  },
  jshint: {
    esnext: true,
    asi: true
  },
  resolve: {
    root: path.resolve(__dirname, "node_modules"),
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx'],
    alias: {
      'material-ui': path.join(__dirname, '..')
      // 'material-ui': 'material-ui-express'
    }
  },
  module: {
    loaders: [
      { test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader")},
      { test: /\.scss$/, loader: ExtractTextPlugin.extract("style-loader", "css!sass")},
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "file" }, //web fonts
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "file" }, // web fonts
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "file" }, // fonts de sistema
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.png(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" }, // Fonte embedada
      { test: /\.jpg(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.gif(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.ico(\?v=\d+\.\d+\.\d+)?$/, loader: "file?name=[path][name].[ext]&context=src" }, // Ico pra aplicações tablet, e OSX (também favicon)
      { test: /\.html(\?v=\d+\.\d+\.\d+)?$/, exclude: /node_modules/, loader: "file?name=[path][name].[ext]&context=src" } //Pra processar documento estático importado
    ]
  }
};