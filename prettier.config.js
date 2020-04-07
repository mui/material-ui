module.exports = {
  printWidth: 100,
  singleQuote: true,
  trailingComma: 'all',
  overrides: [
    {
      files: '*.d.ts',
      options: {
        // This is needed for TypeScript 3.2 support
        trailingComma: 'es5',
      },
    },
  ],
};
