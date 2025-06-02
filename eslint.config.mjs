import { includeIgnoreFile } from '@eslint/compat';
import baseConfig from '@mui/infra/eslint';
import docsConfig from '@mui/infra/eslint-docs';
import testConfig from '@mui/infra/eslint-test';
import consistentDefaultExportName from 'eslint-plugin-consistent-default-export-name';
import { defineConfig } from 'eslint/config';

import * as path from 'node:path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const OneLevelImportMessage = [
  'Prefer one level nested imports to avoid bundling everything in dev mode or breaking CJS/ESM split.',
  'See https://github.com/mui/material-ui/pull/24147 for the kind of win it can unlock.',
].join('\n');
// This only applies to packages published from this monorepo.
// If you build a library around `@mui/material` you can safely use `createStyles` without running into the same issue as we are.
const forbidCreateStylesMessage =
  'Use `MuiStyles<ClassKey, Props>` instead if the styles are exported. Otherwise use `as const` assertions. ' +
  '`createStyles` will lead to inlined, at-compile-time-resolved type-imports. ' +
  'See https://github.com/microsoft/TypeScript/issues/36097#issuecomment-578324386 for more information';

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
      '!@mui/infra/**',
    ],
    message: OneLevelImportMessage,
  },
];

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

export default defineConfig(
  includeIgnoreFile(path.join(dirname, '.eslintignore')),
  includeIgnoreFile(path.join(dirname, '.gitignore')),
  {
    name: 'MUI ESLint config',
    extends: baseConfig,
    languageOptions: {
      globals: {
        React: true,
      },
    },
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: NO_RESTRICTED_IMPORTS_PATTERNS_DEEPLY_NESTED,
        },
      ],
      '@typescript-eslint/consistent-type-imports': 'error',
    },
    settings: {
      'import-x/resolver': {
        webpack: {
          config: path.join(dirname, 'webpackBaseConfig.js'),
        },
      },
    },
  },
  {
    files: [
      '**/*.test.?(c|m)[jt]s?(x)',
    ],
    extends: testConfig
  },
  {
    files: ['docs/**/*'],
    extends: docsConfig,
    rules: {
      'no-restricted-imports': [
          'error',
          {
            paths: NO_RESTRICTED_IMPORTS_PATHS_TOP_LEVEL_PACKAGES,
            patterns: NO_RESTRICTED_IMPORTS_PATTERNS_DEEPLY_NESTED,
          },
        ],
    }
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
    ignorePatterns: [
      // filenames/match-exported sees filename as 'file-name.d'
      // Plugin looks unmaintain, find alternative? (e.g. eslint-plugin-project-structure)
      '*.d.ts',
      'docs/data/joy/getting-started/templates/**/*',
      'docs/data/**/{css,system,tailwind}/*',
    ],
    plugins: {
      'consistent-default-export-name': consistentDefaultExportName,
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
  {
    files: ['*.d.ts'],
    rules: {
      'import-x/export': 'off', // Not sure why it doesn't work
    },
  },
  {
    files: ['packages/*/src/**/*.tsx'],
    ignorePatterns: ['*.spec.tsx'],
    rules: {
      'react/prop-types': 'off',
    },
  },
  {
    files: ['packages/*/src/*/*.?(c|m)[jt]s?(x)'],
    ignorePatterns: [
      '*.spec.*',
      '*.test.*',
      // deprecated library
      '**/mui-joy/**/*',
      // used internally, not used on app router yet
      '**/mui-docs/**/*',
    ],
    rules: {
      'material-ui/disallow-react-api-in-server-components': 'error',
    },
  },
  {
    files: ['packages/*/src/**/*.?(c|m)[jt]s?(x)'],
    ignorePatterns: ['*.spec.*'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@mui/material/styles',
              importNames: ['createStyles'],
              message: forbidCreateStylesMessage,
            },
          ],
          patterns: [
            // Allow deeper imports for TypeScript types. TODO?
            '@mui/*/*/*/*',
          ],
        },
      ],
    },
  },
  {
    files: ['packages-internal/scripts/typescript-to-proptypes/src/**/*.ts'],
    rules: {
      // Working with flags is common in TypeScript compiler
      'no-bitwise': 'off',
    },
  },
  {
    files: ['packages/*/src/**/*.?(c|m)[jt]s?(x)'],
    ignorePatterns: ['*.spec.*'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            ...NO_RESTRICTED_IMPORTS_PATHS_TOP_LEVEL_PACKAGES,
            {
              name: '@mui/utils',
              message: OneLevelImportMessage,
            },
          ],
        },
      ],
      // TODO: Consider setting back to `ignoreExternal: true` when the expected behavior is fixed:
      // https://github.com/import-js/eslint-plugin-import/issues/2348#issuecomment-1587320057
      // Reevaluate when https://github.com/import-js/eslint-plugin-import/pull/2998 is released.
      'import-x/no-cycle': ['error', { ignoreExternal: false }],
    },
  },
  {
    files: ['packages/*/src/**/*.?(c|m)[jt]s?(x)'],
    ignorePatterns: ['*.d.ts', '*.spec.*', 'packages/mui-joy/**/*'],
    rules: {
      'material-ui/mui-name-matches-component-name': 'error',
    },
  },
  {
    files: ['test/bundling/scripts/**/*.js'],
    rules: {
      // ES modules need extensions
      'import-x/extensions': ['error', 'ignorePackages'],
    },
  },
  {
    files: ['**/*.mjs'],
    rules: {
      'import-x/extensions': ['error', 'ignorePackages'],
    },
  },
  {
    /**
     * Examples are for demonstration purposes and should not be considered a part of the library.
     * They don't contain ESLint setup, so we don't want them to contain ESLint directives
     * We do, however, want to keep the rules in place to ensure the examples are following
     * a reasonably similar code style as the library.
     */
    files: ['examples/**/*'],
    rules: {
      'no-console': 'off',
      'no-underscore-dangle': 'off',
      'import-x/no-unresolved': 'off',
      'import-x/namespace': 'off',
      'import-x/extensions': 'off',
      'import-x/named': 'off',
      'import-x/no-duplicates': 'off',
      'import-x/no-named-as-default': 'off',
      'import-x/default': 'off',
      'import-x/no-named-as-default-member': 'off',
      'import-x/order': 'off',
      // Reset the default until https://github.com/jsx-eslint/eslint-plugin-react/issues/3672 is fixed.
      'react/jsx-no-target-blank': ['error', { allowReferrer: false }],
      'react/prop-types': 'off',
      'no-irregular-whitespace': ['error', { skipJSXText: true, skipStrings: true }],
    },
  },
  {
    // TODO, move rule to be global, propagate: https://github.com/mui/material-ui/issues/42169
    files: ['examples/material-ui-pigment-css-vite-ts/**/*'],
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
  },
  {
    files: ['apps/**/*'],
    rules: {
      'import-x/no-relative-packages': 'off',
    },
  },
);
