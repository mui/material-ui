module.exports = {
  extends: 'stylelint-config-standard',
  ignoreFiles: [
    // TypeScript declaration files contain no styles.
    // Stylelint is also reporting parseError on `docs/types/react-docgen.d.ts`.
    '**/*.d.ts',
    'docs/.next/**/*',
    'docs/export/**/*',
    '**/node_modules/**/*',
  ],
  rules: {
    'alpha-value-notation': null,
    'custom-property-pattern': null,
    'media-feature-range-notation': null,
    'no-empty-source': null,
    'selector-class-pattern': null,
    'string-no-newline': null, // not compatible with prettier
    'value-keyword-case': null,
  },
  overrides: [
    {
      files: ['**/*.js', '**/*.cjs', '**/*.mjs', '**/*.ts', '**/*.tsx'],
      customSyntax: 'postcss-styled-syntax',
    },
  ],
};
