module.exports = {
  settings: {
    'import/resolver': {
      webpack: {
        config: '../../docs/webpack.dev.config.js',
      },
    },
  },
  rules: {
    // needed for mustache and temp
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
  }
};
