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
    {
      files: ['docs/**/*.md', 'docs/src/pages/**/*.{js,tsx}'],
      options: {
        // otherwise code blocks overflow on the docs website
        printWidth: 80,
      },
    },
  ],
};
