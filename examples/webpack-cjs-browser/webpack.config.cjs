const path = require('node:path');

module.exports = {
  entry: './src/index.cjs',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '/dist/',
    clean: true,
  },
  devServer: {
    static: {
      directory: __dirname,
    },
    devMiddleware: {
      publicPath: '/dist/',
    },
    host: '127.0.0.1',
    port: 3005,
  },
  target: 'web',
  devtool: false,
  resolve: {
    extensions: ['.cjs', '.js'],
    aliasFields: ['browser'],
    mainFields: ['browser', 'module', 'main'],
  },
};
