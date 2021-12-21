module.exports = {
  processors: ['stylelint-processor-styled-components'],
  extends: 'stylelint-config-standard',
  ignoreFiles: [
    // TypeScript declaration files contain no styles.
    // Stylelint is also reporting parseError on `docs/types/react-docgen.d.ts`.
    '**/*.d.ts',
  ],
  rules: {
    'value-no-vendor-prefix': true,
    'property-no-vendor-prefix': true,
    'no-empty-source': null,
    'no-missing-end-of-source-newline': null,
    'declaration-colon-newline-after': null,
    'value-keyword-case': null,
    'value-list-comma-newline-after': null, // not compatible with prettier
    'function-parentheses-newline-inside': null, // not compatible with prettier
    'string-no-newline': null, // not compatible with prettier
  },
};
