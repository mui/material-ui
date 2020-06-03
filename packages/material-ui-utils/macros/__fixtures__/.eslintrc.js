module.exports = {
  rules: {
    // keeps test simple
    'no-unreachable': 'off',
    // keeps test simple
    'no-useless-concat': 'off',

    // Babel import helpers do not add one.
    // Since this is auto generated code we don't care about code style.
    'import/newline-after-import': 'off',
  },
};
