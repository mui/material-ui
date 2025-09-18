export default {
  extends: '@mui/internal-code-infra/stylelint',
  overrides: [
    {
      files: [
        'docs/data/material/integrations/interoperability/**/*.js',
        'docs/data/material/integrations/interoperability/**/*.tsx',
      ],
      rules: {
        'nesting-selector-no-missing-scoping-root': null,
      },
    },
    {
      files: ['docs/data/joy/**/*.js', 'docs/data/joy/**/*.tsx'],
      rules: {
        'property-no-deprecated': null,
      },
    },
  ],
};
