const plugins = [];

// Not all projects in the org have docs for Tailwind CSS.
try {
  // eslint-disable-next-line
  require('tailwindcss');
  // must be loaded last: https://github.com/tailwindlabs/prettier-plugin-tailwindcss?tab=readme-ov-file#compatibility-with-other-prettier-plugins
  plugins.push('prettier-plugin-tailwindcss');
} catch (err) {
  // continue regardless of error
}

module.exports = {
  printWidth: 100,
  singleQuote: true,
  trailingComma: 'all',
  plugins: [...plugins],
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
