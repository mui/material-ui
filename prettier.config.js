module.exports = {
  printWidth: 100,
  singleQuote: true,
  trailingComma: 'all',
  overrides: [
    {
      files: ['docs/**/*.md', 'docs/src/pages/**/*.{js,tsx}'],
      options: {
        // otherwise code blocks overflow on the docs website
        printWidth: 85,
      },
    },
  ],
};
