module.exports = {
  rules: {
    // auto generated imports do no add a newline
    'import/newline-after-import': 'off',
    // for testing purposes
    'no-useless-concat': 'off',
    // Need to use explicit /src folder.
    // Can't use same module resolution as root config.
    // https://github.com/babel-utils/babel-plugin-tester/issues/74
    'no-restricted-imports': 'off',
  },
};
