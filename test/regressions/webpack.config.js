const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const webpackBaseConfig = require('../../webpackBaseConfig');

module.exports = {
  ...webpackBaseConfig,
  entry: path.resolve(__dirname, 'index.js'),
  mode: process.env.NODE_ENV || 'development',
  optimization: {
    // Helps debugging and build perf.
    // Bundle size is irrelevant for local serving
    minimize: false,
  },
  output: {
    path: path.resolve(__dirname, './build'),
    publicPath: '/',
    filename: 'tests.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './template.html'),
    }),
    // Avoid bundling the whole @mui/icons-material package. x2 the bundling speed.
    new webpack.IgnorePlugin({ resourceRegExp: /material-icons\/SearchIcons\.js/ }),
    new webpack.ProvidePlugin({
      // required by enzyme > cheerio > parse5 > util
      process: 'process/browser',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          configFile: path.resolve(__dirname, '../../babel.config.js'),
        },
      },
      {
        test: /\.md$/,
        type: 'asset/source',
      },
      {
        test: /\.(jpg|gif|png)$/,
        type: 'asset/inline',
      },
    ],
  },
  resolve: {
    ...webpackBaseConfig.resolve,
    alias: {
      ...webpackBaseConfig.resolve.alias,
      '@material-ui/core': path.resolve(__dirname, '../../packages/mui-material/src'),
      '@material-ui/styles': path.resolve(__dirname, '../../packages/mui-styles/src'),
    },
    fallback: {
      // needed by enzyme > cheerio
      stream: false,
      // required by enzyme > cheerio > parse5
      util: require.resolve('util/'),
    },
  },
  // TODO: 'browserslist:modern'
  // See https://github.com/webpack/webpack/issues/14203
  target: 'web',
};
