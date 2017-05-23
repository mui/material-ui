// @flow weak
const es2015 = require('babel-preset-es2015').buildPreset;

const ENV = process.env.BABEL_ENV;

module.exports = {
  presets: [
    [
      es2015,
      {
        modules: ENV === 'modules' ? false : 'commonjs',
      },
    ],
  ],
};
