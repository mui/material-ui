module.exports = {
  // So parent files don't get applied
  root: true,
  plugins: ['spellcheck'],
  rules: {
    'spellcheck/spell-checker': [
      'error',
      {
        comments: true,
        strings: true,
        identifiers: true,
        lang: 'en_US',
        skipWords: [],
        skipIfMatch: [],
        minLength: 3,
      },
    ],
  },
};
