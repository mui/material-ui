import {
  createBaseConfig,
  createTestConfig,
  baseSpecRules,
  createDocsConfig,
  EXTENSION_TS,
  EXTENSION_TEST_FILE,
  EXTENSION_DTS,
} from '@mui/internal-code-infra/eslint';
import { defineConfig } from 'eslint/config';
import eslintPluginConsistentName from 'eslint-plugin-consistent-default-export-name';
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
      // Allow any import depth with any internal packages
      '!@mui/internal-*/**',
      '!@mui/docs/**', // @mui/docs should be @mui/internal-docs
    ],
    message: OneLevelImportMessage,
  },
];

export default defineConfig(
  createBaseConfig({
    enableReactCompiler: ENABLE_REACT_COMPILER_PLUGIN,
    baseDirectory: dirname,
  }),
  {
    name: 'Material UI overrides',
    files: [`**/*${EXTENSION_TS}`],
    settings: {
      'import/resolver': {
        typescript: {
          project: ['tsconfig.json'],
        },
      },
    },
    rules: {
      'import/prefer-default-export': 'error',
      'material-ui/straight-quotes': 'error',
      'no-restricted-imports': [
        'error',
        {
          patterns: NO_RESTRICTED_IMPORTS_PATTERNS_DEEPLY_NESTED,
        },
      ],
      'react/react-in-jsx-scope': 'off',
      'react/sort-prop-types': 'off', // 228
      '@typescript-eslint/ban-ts-comment': 'off', // 117
      '@typescript-eslint/no-require-imports': 'off', // 133
      'react/jsx-filename-extension': 'off',

      // TODO enable:
      'react-hooks/refs': 'off',
      'react-hooks/globals': 'off',
      'react-hooks/immutability': 'off',
      'react-hooks/preserve-manual-memoization': 'off',
      'react-hooks/incompatible-library': 'off',
      'react-hooks/static-components': 'off',
      'react-hooks/purity': 'off',
    },
  },
  ...['mui-material', 'mui-system', 'mui-utils', 'mui-lab', 'mui-utils', 'mui-styled-engine'].map(
    (packageName) => ({
      files: [`packages/${packageName}/src/**/*${EXTENSION_TEST_FILE}`],
      ignores: ['**/*.test.*', '**/*.spec.*'],
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
  {
    files: [`packages/**/*${EXTENSION_TS}`],
    rules: {
      // Our packages write .js + .d.ts files manually.
      'react/jsx-filename-extension': ['error', { extensions: ['.js', '.tsx'] }],
    },
  },
  // Test start
  {
    files: [`**/*${EXTENSION_TEST_FILE}`],
    extends: createTestConfig({
      useMocha: true,
    }),
    rules: {
      'material-ui/no-empty-box': 'off',
      // Disabled temporarily. Enable one by one.
      'testing-library/no-container': 'off',
    },
  },
  // Test end
  // Docs start
  {
    files: [`docs/**/*${EXTENSION_TS}`],
    extends: createDocsConfig(),
    rules: {
      '@next/next/no-img-element': 'off',
      'no-restricted-imports': [
        'error',
        {
          paths: NO_RESTRICTED_IMPORTS_PATHS_TOP_LEVEL_PACKAGES,
          patterns: NO_RESTRICTED_IMPORTS_PATTERNS_DEEPLY_NESTED,
        },
      ],
    },
  },
  // Moved from docs/data/material/components/.eslintrc.js
  {
    files: [`docs/data/material/components/**/*${EXTENSION_TS}`],
    rules: {
      // useful for interactions feedback
      'no-console': ['off', { allow: ['info'] }],
      // not very friendly to prop forwarding
      'react/jsx-handler-names': 'off',
    },
  },
  // demos
  {
    files: [`docs/src/pages/**/*${EXTENSION_TS}`, `docs/data/**/*${EXTENSION_TS}`],
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
    files: [`docs/pages/**/*${EXTENSION_TS}`, `packages/*/src/**/*.tsx`],
    ignores: ['**/*.spec.tsx'],
    rules: {
      'react/prop-types': 'off',
    },
  },
  {
    files: [`docs/data/**/*${EXTENSION_TS}`],
    ignores: [
      // filenames/match-exported sees filename as 'file-name.d'
      // Plugin looks unmaintain, find alternative? (e.g. eslint-plugin-project-structure)
      '**/*.d.ts',
      'docs/data/joy/getting-started/templates/**/*',
      'docs/data/**/{css,system,tailwind}/*',
    ],
    plugins: {
      'consistent-default-export-name': eslintPluginConsistentName,
    },
    rules: {
      'consistent-default-export-name/default-export-match-filename': ['error'],
    },
  },
  // Docs end
  {
    files: [`**/*${EXTENSION_DTS}`],
    rules: {
      'import/export': 'off', // Not sure why it doesn't work
    },
  },
  {
    files: [`packages/*/src/*/*${EXTENSION_TS}`],
    ignores: [
      '**/*.spec.*',
      '**/*.test.*',
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
    files: [`packages/*/src/**/*${EXTENSION_TS}`],
    ignores: ['**/*.spec.*'],
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
            {
              name: '@mui/material/styles',
              importNames: ['createStyles'],
              message: forbidCreateStylesMessage,
            },
          ],
        },
      ],
    },
  },
  baseSpecRules,
  {
    files: ['packages-internal/scripts/typescript-to-proptypes/src/**/*.ts'],
    rules: {
      // Working with flags is common in TypeScript compiler
      'no-bitwise': 'off',
    },
  },
  {
    files: [`packages/*/src/**/*${EXTENSION_TS}`],
    ignores: ['**/*.d.ts', '**/*.spec.*', 'packages/mui-joy/**/*'],
    rules: {
      'material-ui/mui-name-matches-component-name': 'error',
    },
  },
  {
    files: ['test/bundling/scripts/**/*.js'],
    rules: {
      // ES modules need extensions
      'import/extensions': ['error', 'ignorePackages'],
    },
  },
  // Migrated config from packages/mui-icons-material/.eslintrc.js
  {
    files: [`packages/mui-icons-material/custom/**/*${EXTENSION_TS}`],
    rules: {
      'import/no-unresolved': 'off',
      'import/extensions': 'off',
    },
  },
  // Migrated config from packages/api-docs-builder/.eslintrc.js
  {
    files: [
      `packages/api-docs-builder/**/*${EXTENSION_TS}`,
      // Allow named exports for locales: https://github.com/mui/material-ui/pull/46933
      `packages/mui-material/src/locale/*${EXTENSION_TS}`,
    ],
    rules: {
      'import/prefer-default-export': 'off',
    },
  },
  // Migrated config from packages/api-docs-builder-core/.eslintrc.js
  {
    files: [`packages/api-docs-builder-core/**/*${EXTENSION_TS}`],
    rules: {
      'import/no-default-export': 'error',
      'import/prefer-default-export': 'off',
    },
  },
  {
    files: [`examples/**/*${EXTENSION_TS}`],
    rules: {
      'import/no-relative-packages': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'import/prefer-default-export': 'off',
    },
  },
  {
    files: [`examples/**/*${EXTENSION_TS}`],
    rules: {
      'import/extensions': 'off',
      'import/no-unresolved': 'off',
      'no-console': 'off',
    },
  },
  {
    files: ['docs/src/pages/premium-themes/onepirate/modules/form/RFTextField.js'],
    rules: {
      // Otherwise, running docs:typescript:formatted rearranges the imports and also removes the eslint-disable comment
      // if added.
      'import/order': 'off',
    },
  },
);
