import { includeIgnoreFile } from '@eslint/compat';
import { createBaseConfig, createTestConfig, baseSpecRules } from '@mui/internal-code-infra/eslint';
import { createDocsConfig } from '@mui/internal-code-infra/eslint-docs';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslingPluginConsistentName from 'eslint-plugin-consistent-default-export-name';
import * as path from 'node:path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const OneLevelImportMessage = [
  'Prefer one level nested imports to avoid bundling everything in dev mode or breaking CJS/ESM split.',
  'See https://github.com/mui/material-ui/pull/24147 for the kind of win it can unlock.',
].join('\n');

const ENABLE_REACT_COMPILER_PLUGIN = false;

const NO_RESTRICTED_IMPORTS_PATHS_TOP_LEVEL_PACKAGES = [
  {
    name: '@mui/material',
    message: OneLevelImportMessage,
  },
  {
    name: '@mui/lab',
    message: OneLevelImportMessage,
  },
];

const NO_RESTRICTED_IMPORTS_PATTERNS_DEEPLY_NESTED = [
  {
    group: [
      '@mui/*/*/*',
      '@pigment-css/*/*/*',
      '@base-ui/*/*/*',
      // Allow any import depth with any internal packages
      '!@mui/internal-*/**',
      // TODO delete
      '@base-ui-components/*/*/*', // Wait for migration to @base-ui/
      '@base_ui/*/*/*', // Legacy, moved to @base-ui-components/
      '!@mui/docs/**', // @mui/docs should be @mui/internal-docs
    ],
    message: OneLevelImportMessage,
  },
];

export default defineConfig(
  includeIgnoreFile(path.join(dirname, '.gitignore')),
  includeIgnoreFile(path.join(dirname, '.eslintignore')),
  globalIgnores(['apps'], 'Global ignores'),
  {
    name: 'Base ESLint Configuration',
    extends: createBaseConfig({
      enableReactCompiler: ENABLE_REACT_COMPILER_PLUGIN,
    }),
    settings: {
      'import/resolver': {
        webpack: {
          config: path.join(dirname, './webpackBaseConfig.js'),
        },
      },
    },
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: NO_RESTRICTED_IMPORTS_PATTERNS_DEEPLY_NESTED,
        },
      ],
    },
  },
  ...['mui-material', 'mui-system', 'mui-utils', 'mui-lab', 'mui-utils', 'mui-styled-engine'].map(
    (packageName) => ({
      files: [`packages/${packageName}/src/**/*.?(c|m)[jt]s?(x)`],
      ignores: ['*.test.*', '*.spec.*'],
      rules: {
        'material-ui/no-restricted-resolved-imports': [
          'error',
          [
            {
              pattern: `**/packages/${packageName}/src/index.*`,
              message:
                "Don't import from the package index. Import the specific module directly instead.",
            },
          ],
        ],
      },
    }),
  ),
  // Docs start
  {
    files: ['docs/**/*'],
    extends: createDocsConfig(),
    rules: {
      '@next/next/no-img-element': 'error',
      'no-restricted-imports': [
        'error',
        {
          paths: NO_RESTRICTED_IMPORTS_PATHS_TOP_LEVEL_PACKAGES,
          patterns: NO_RESTRICTED_IMPORTS_PATTERNS_DEEPLY_NESTED,
        },
      ],
    },
  },
  {
    files: ['docs/src/modules/components/**/*'],
    rules: {
      'material-ui/no-hardcoded-labels': [
        'error',
        { allow: ['MUI', 'X', 'GitHub', 'Stack Overflow'] },
      ],
    },
  },
  // demos
  {
    files: ['docs/src/pages/**/*', 'docs/data/**/*'],
    rules: {
      // This most often reports data that is defined after the component definition.
      // This is safe to do and helps readability of the demo code since the data is mostly irrelevant.
      '@typescript-eslint/no-use-before-define': 'off',
      'react/prop-types': 'off',
      'no-alert': 'off',
      'no-console': 'off',
    },
  },
  // Next.js entry points pages
  {
    files: ['docs/pages/**/*'],
    rules: {
      'react/prop-types': 'off',
    },
  },
  {
    files: ['docs/data/**/*'],
    ignores: [
      // filenames/match-exported sees filename as 'file-name.d'
      // Plugin looks unmaintain, find alternative? (e.g. eslint-plugin-project-structure)
      '*.d.ts',
      'docs/data/joy/getting-started/templates/**/*',
      'docs/data/**/{css,system,tailwind}/*',
    ],
    plugins: {
      'consistent-default-export-name': eslingPluginConsistentName,
    },
    rules: {
      'consistent-default-export-name/default-export-match-filename': ['error'],
    },
  },
  {
    files: ['docs/data/material/getting-started/templates/**/*'],
    rules: {
      // So we can use # to improve the page UX
      // and so developer get eslint warning to remind them to fix the links
      'jsx-a11y/anchor-is-valid': 'off',
    },
  },
  // Docs end
  {
    files: ['*.d.ts'],
    rules: {
      'import/export': 'off', // Not sure why it doesn't work
    },
  },
  // Test start
  {
    files: [
      // matching the pattern of the test runner
      '**/*.test.?(c|m)[jt]s?(x)',
    ],
    extends: createTestConfig(),
    rules: {
      'testing-library/prefer-screen-queries': 'off',
      'testing-library/no-container': 'off',
      'testing-library/no-dom-import': 'off',
      'testing-library/no-node-access': 'off',
      'testing-library/render-result-naming-convention': 'off',
      'testing-library/no-await-sync-queries': 'off',
    },
  },
  baseSpecRules,
  {
    files: ['**/*.mjs'],
    rules: {
      'import/extensions': ['error', 'ignorePackages'],
    },
  },
);
