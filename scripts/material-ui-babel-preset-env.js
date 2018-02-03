const env = require('babel-preset-env');

const ENV = process.env.BABEL_ENV;
let babelPresetEnv;

// We release a ES version of Material-UI.
// It's something that matches the latest official supported features of JavaScript.
// Nothing more (stage-1, etc), nothing less (require, etc).
if (ENV === 'es') {
  babelPresetEnv = {};
} else {
  babelPresetEnv = {
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
}

module.exports = babelPresetEnv;
