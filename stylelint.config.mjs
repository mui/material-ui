export default {
  extends: 'stylelint-config-standard',
  rules: {
    'alpha-value-notation': null,
    'custom-property-pattern': null,
    'media-feature-range-notation': null,
    'no-empty-source': null,
    'selector-class-pattern': null,
    'string-no-newline': null, // not compatible with Prettier
    'value-keyword-case': null,
    'at-rule-no-unknown': [true, { ignoreAtRules: ['tailwind'] }],
    'declaration-block-no-redundant-longhand-properties': [
      true,
      {
        ignoreShorthands: [
          'place-content', // Nobody uses this shorthand property.
        ],
      },
    ],
    'custom-property-empty-line-before': null, // Allow arbitrary grouping of custom properties
  },
  overrides: [
    {
      files: ['**/*.js', '**/*.cjs', '**/*.mjs', '**/*.ts', '**/*.tsx'],
      customSyntax: 'postcss-styled-syntax',
    },
  ],
};
