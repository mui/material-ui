module.exports = {
  rules: {
    'import/prefer-default-export': 'off',
    // Allow .js file extensions in import statements for ESM compatibility
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'always',
        mjs: 'always',
      },
    ],
  },
};
