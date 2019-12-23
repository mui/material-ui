const path = require('path');
const webpack = require('@cypress/webpack-preprocessor');

const webpackOptions = {
  resolve: {
    alias: {
      react: path.resolve(__dirname, '../../../node_modules/react'),
      'react-dom': path.resolve(__dirname, '../../../node_modules/react-dom'),
    },
    extensions: ['.ts', '.js', '.jsx', '.tsx'],
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        loader: 'babel-loader',
      },
    ],
  },
};

module.exports = on => {
  on(
    'file:preprocessor',
    webpack({
      webpackOptions,
    })
  );
};
