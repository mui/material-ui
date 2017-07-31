// @flow

const env = require('babel-preset-env');

const ENV = process.env.BABEL_ENV;

module.exports = {
  presets: [
    [
      env,
      {
        targets: {
          ie: 11,
          edge: 14,
          firefox: 45,
          chrome: 49,
          safari: 10,
          node: '6.11',
        },
        modules: ENV === 'modules' ? false : 'commonjs',
      },
    ],
  ],
};
