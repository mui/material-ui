// Note: To debug stylelint config resolution for a specific file, use
//         pnpm exec stylelint --print-config <path-to-file>

/** @type {import('stylelint').Config} */
export default {
  extends: '@mui/internal-code-infra/stylelint',
  rules: {
    'at-rule-no-unknown': null,
  },
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
  ],
};
