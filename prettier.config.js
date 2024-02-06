module.exports = {
  printWidth: 100,
  singleQuote: true,
  trailingComma: 'all',
  overrides: [
    {
      files: ['docs/**/*.md', 'docs/src/pages/**/*.{js,tsx}', 'docs/data/**/*.{js,tsx}'],
      options: {
        // otherwise code blocks overflow on the docs website
        // The container is 751px
        printWidth: 85,
      },
    },
    {
      files: ['docs/pages/blog/**/*.md'],
      options: {
        // otherwise code blocks overflow on the blog website
        // The container is 692px
        printWidth: 82,
      },
    },
    {
      files: ['**/*.json'],
      options: {
        trailingComma: 'none',
      },
    },
  ],
};
