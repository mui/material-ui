module.exports = {
  env: {
    mocha: true,
  },
  globals: {
    expect: false,
  },
  rules: {
    'no-unused-expressions': 'off',
    // needed for src/* resolution off of root
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
  },
};
