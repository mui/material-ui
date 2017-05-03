// @flow weak
const webpack = require('webpack');
const pkg = require('../package.json');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        MATERIAL_UI_VERSION: JSON.stringify(pkg.version),
      },
    }),
  ],
};
