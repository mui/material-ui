module.exports = {
  extends: 'stylelint-config-standard',
  ignoreFiles: [
    // TypeScript declaration files contain no styles.
    // Stylelint is also reporting parseError on `docs/types/react-docgen.d.ts`.
    '**/*.d.ts',
  ],
  rules: {
    'alpha-value-notation': null,
    'custom-property-pattern': null,
    'declaration-colon-newline-after': null,
    'function-parentheses-newline-inside': null, // not compatible with prettier
    'media-feature-range-notation': null,
    'no-empty-source': null,
    'no-missing-end-of-source-newline': null,
    'selector-class-pattern': null,
    'string-no-newline': null, // not compatible with prettier
    'value-keyword-case': null,
    'value-list-comma-newline-after': null, // not compatible with prettier
  },
  overrides: [
    {
      files: ['**/*.js', '**/*.cjs', '**/*.mjs', '**/*.jsx', '**/*.ts', '**/*.tsx'],
      customSyntax: 'postcss-styled-syntax',
    },
  ],
};
