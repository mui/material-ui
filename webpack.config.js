// @flow weak
/* eslint-disable comma-dangle */

const path = require('path');
const webpack = require('webpack');

const libraryName = 'material-ui';

const paths = {
  src: path.resolve(__dirname, 'src'),
  index: path.join(__dirname, 'src/index.js'),
  dist: path.join(__dirname, 'build/dist'),
};

const env = {
  env: process.env.NODE_ENV || 'development', // eslint-disable-line no-process-env
  isProd() { return this.env === 'production'; },
  isDev() { return this.env === 'development'; },
  isTest() { return this.env === 'test'; },
};

const config = {
  entry: {
    'material-ui': paths.index,
  },
  devtool: 'source-map',
  output: {
    path: paths.dist,
    filename: `${env.isProd() ? `${libraryName}.min` : libraryName}.js`,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  externals: [
    'react-addons-create-fragment',
    'react-addons-transition-group',
    {
      react: {
        root: 'React',
        commonjs2: './react',
        commonjs: ['./react'],
        amd: 'react',
      },
    },
    {
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: './react-dom',
        commonjs: ['./react-dom'],
        amd: 'react-dom',
      },
    },
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        query: {
          cacheDirectory: true,
        },
      },
    ],
  },
  resolve: {
    modules: [
      paths.src,
      'node_modules',
    ],
  },
  plugins: [].concat(
    env.isProd() ? [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          screw_ie8: true,
        },
      }),
    ] : []
  ),
};

module.exports = config;
