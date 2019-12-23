module.exports = {
  presets: [
    '@babel/preset-react',
    '@babel/preset-typescript',
    ['@babel/preset-env', { modules: false }],
  ],
  plugins: [
    'optimize-clsx',
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    // ['@babel/plugin-transform-runtime'],
    // for IE 11 support
    '@babel/plugin-transform-object-assign',
    '@babel/plugin-proposal-optional-chaining',
    './remove-prop-types.js',
  ],
  env: {
    production: {
      plugins: [
        '@babel/plugin-transform-react-constant-elements',
        ['babel-plugin-react-remove-properties', { properties: ['data-mui-test'] }],
      ],
    },
  },
};
