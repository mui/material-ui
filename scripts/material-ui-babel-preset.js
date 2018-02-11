const env = require('babel-preset-env');

const ENV = process.env.BABEL_ENV;
const NODE_ENV = process.env.NODE_ENV;
let preset;

// We release a ES version of Material-UI.
// It's something that matches the latest official supported features of JavaScript.
// Nothing more (stage-1, etc), nothing less (require, etc).
if (ENV === 'es') {
  preset = {};
} else {
  preset = {
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

// Babel's `env` is `BABEL_ENV || NODE_ENV || 'development'`
// See https://babeljs.io/docs/usage/babelrc/#env-option
// However, this means that you can't combine `BABEL_ENV=modules` and `NODE_ENV=production`
// as `env` will be set to 'modules' and the `NODE_ENV` bit is essentially lost.
if (NODE_ENV === 'production') {
  preset = Object.assign({}, preset, {
    plugins: [
      require.resolve('babel-plugin-transform-react-constant-elements'),
      require.resolve('babel-plugin-transform-dev-warning'),
      require.resolve('babel-plugin-transform-runtime'),
      [require.resolve('babel-plugin-react-remove-properties'), { properties: ['data-mui-test'] }],
      [
        require.resolve('babel-plugin-transform-react-remove-prop-types'),
        {
          mode: 'wrap',
          plugins: [require.resolve('babel-plugin-transform-flow-strip-types')],
        },
      ],
    ],
  });
}

module.exports = preset;
