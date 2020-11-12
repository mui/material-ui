module.exports = {
  processors: ['stylelint-processor-styled-components'],
  extends: 'stylelint-config-standard',
  rules: {
    'value-no-vendor-prefix': true,
    'property-no-vendor-prefix': true,
    'no-empty-source': null,
    'no-missing-end-of-source-newline': null,
    'declaration-colon-newline-after': null,
    'value-keyword-case': null,
  },
};
