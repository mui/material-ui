import base from '@mui/internal-code-infra/stylelint';

// Note: To debug stylelint config resolution for a specific file, use
//         pnpm exec stylelint --print-config <path-to-file>

/** @type {import('stylelint').Config} */
export default {
  extends: base,
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
