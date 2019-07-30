module.exports = {
  presets: [
    '@babel/preset-react',
    '@babel/preset-typescript',
    ['@babel/preset-env', { modules: false }],
  ],
  plugins: [
    'optimize-clsx',
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-object-rest-spread', { loose: true }],
    ['@babel/plugin-transform-runtime', { useESModules: true }],
    // for IE 11 support
    '@babel/plugin-transform-object-assign',
    './remove-prop-types.js',
  ],
};
