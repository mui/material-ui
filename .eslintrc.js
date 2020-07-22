const path = require('path');

module.exports = {
  root: true, // So parent files don't get applied
  globals: {
    preval: false, // Used in the documentation
  },
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  extends: [
    'plugin:import/recommended',
    'plugin:import/typescript',
    'airbnb-typescript',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 7,
  },
  plugins: ['material-ui', 'react-hooks', '@typescript-eslint'],
  settings: {
    'import/resolver': {
      webpack: {
        config: path.join(__dirname, './docs/webpackBaseConfig.js'),
      },
    },
  },
  /**
   * Sorted alphanumerically within each group. built-in and each plugin form
   * their own groups.
   */
  rules: {
    'consistent-this': ['error', 'self'],
    // just as bad as "max components per file"
    'max-classes-per-file': 'off',
    'no-alert': 'error', // Too much interruptive
    'no-console': ['error', { allow: ['warn', 'error'] }], // Allow warn and error for production events
    'no-param-reassign': 'off', // It's fine.
    'no-restricted-imports': [
      'error',
      {
        patterns: ['@material-ui/*/*/*', '!@material-ui/utils/macros/*.macro'],
      },
    ],
    'no-constant-condition': 'error',
    'no-prototype-builtins': 'off', // Use the proptype inheritance chain
    'no-underscore-dangle': 'error',
    'nonblock-statement-body-position': 'error',
    'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
    'prefer-destructuring': 'off', // Destructuring harm grep potential.
    '@typescript-eslint/dot-notation': 'off', // TODO performance consideration
    '@typescript-eslint/no-implied-eval': 'off', // TODO performance consideration
    '@typescript-eslint/no-throw-literal': 'off', // TODO performance consideration
    'import/named': 'off', // Not sure why it doesn't work
    'import/no-extraneous-dependencies': 'off', // Missing yarn workspace support
    'jsx-a11y/label-has-associated-control': 'off', // doesn't work?
    'jsx-a11y/no-autofocus': 'off', // We are a library, we need to support it too
    'material-ui/docgen-ignore-before-comment': 'error',
    'react-hooks/exhaustive-deps': ['error', { additionalHooks: 'useEnhancedEffect' }],
    'react-hooks/rules-of-hooks': 'error',
    'react/destructuring-assignment': 'off', // It's fine.
    'react/forbid-prop-types': 'off', // Too strict, no time for that
    'react/jsx-curly-brace-presence': 'off', // broken
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.tsx'] }], // airbnb is using .jsx
    'react/jsx-fragments': ['error', 'element'], // Prefer <React.Fragment> over <>.
    'react/jsx-props-no-spreading': 'off', // We are a UI library.
    'react/no-array-index-key': 'off', // This rule is great for raising people awareness of what a key is and how it works.
    'react/no-danger': 'error',
    'react/no-direct-mutation-state': 'error',
    'react/no-find-dom-node': 'off', // Required for backward compatibility. TODO v5, drop
    'react/require-default-props': 'off', // Not always relevant
    'react/sort-prop-types': 'error',
    // This depends entirely on what you're doing. There's no universal pattern
    'react/state-in-constructor': 'off',
    // stylistic opinion. For conditional assignment we want it outside, otherwise as static
    'react/static-property-placement': 'off',
  },
  overrides: [
    {
      files: [
        // matching the pattern of the test runner
        '*.test.js',
      ],
      env: {
        mocha: true,
      },
      extends: ['plugin:mocha/recommended'],
      rules: {
        // does not work with wildcard imports. Mistakes will throw at runtime anyway
        'import/named': 'off',
        'no-restricted-imports': [
          'error',
          {
            // Use named import from `test/utils` instead.
            // The other files are private.
            patterns: ['test/utils/*'],
          },
        ],

        'material-ui/disallow-active-element-as-key-event-target': 'error',

        // upgraded level from recommended
        'mocha/no-exclusive-tests': 'error',
        'mocha/no-skipped-tests': 'error',

        // no rationale provided in /recommended
        'mocha/no-mocha-arrows': 'off',
        // definitely a useful rule but too many false positives
        // due to `describeConformance`
        // "If you're using dynamically generated tests, you should disable this rule.""
        'mocha/no-setup-in-describe': 'off',
        // `beforeEach` for a single case is optimized for change
        // when we add a test we don't have to refactor the existing
        // test to `beforeEach`.
        // `beforeEach`+`afterEach` also means that the `beforeEach`
        // is cleaned up in `afterEach` if the test causes a crash
        'mocha/no-hooks-for-single-case': 'off',

        // disable eslint-plugin-jsx-a11y
        // tests are not driven by assistive technology
        // add `jsx-a11y` rules once you encounter them in tests
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/control-has-associated-label': 'off',
        'jsx-a11y/iframe-has-title': 'off',
        'jsx-a11y/mouse-events-have-key-events': 'off',
        'jsx-a11y/no-noninteractive-tabindex': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/tabindex-no-positive': 'off',

        // They are accessed to test custom validator implementation with PropTypes.checkPropTypes
        'react/forbid-foreign-prop-types': 'off',
        // components that are defined in test are isolated enough
        // that they don't need type-checking
        'react/prop-types': 'off',
      },
    },
    {
      files: ['docs/src/modules/components/**/*.js'],
      rules: {
        'material-ui/no-hardcoded-labels': [
          'error',
          { allow: ['Material-UI', 'Twitter', 'GitHub', 'StackOverflow'] },
        ],
      },
    },
    {
      files: ['docs/pages/**/*.js'],
      rules: {
        'react/prop-types': 'off',
      },
    },
    {
      files: ['*.d.ts'],
      rules: {
        'import/export': 'off', // Not sure why it doesn't work
      },
    },
    {
      files: ['*.tsx'],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            patterns: ['@material-ui/*/*/*/*', '!@material-ui/utils/macros/*.macro'],
          },
        ], // Allow deeper imports for TypeScript types. TODO?
        'react/prop-types': 'off',
      },
    },
    {
      files: ['*.spec.tsx', '*.spec.ts'],
      rules: {
        'no-alert': 'off',
        'no-console': 'off',
        'no-empty-pattern': 'off',
        'no-lone-blocks': 'off',
        'no-shadow': 'off',
        '@typescript-eslint/no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        'import/export': 'off', // Not sure why it doesn't work
        'import/prefer-default-export': 'off',
        'jsx-a11y/anchor-has-content': 'off',
        'jsx-a11y/anchor-is-valid': 'off',
        'jsx-a11y/tabindex-no-positive': 'off',
        'react/default-props-match-prop-types': 'off',
        'react/no-access-state-in-setstate': 'off',
        'react/no-unused-prop-types': 'off',
        'react/prefer-stateless-function': 'off',
        'react/prop-types': 'off',
        'react/require-default-props': 'off',
        'react/state-in-constructor': 'off',
        'react/static-property-placement': 'off',
      },
    },
    {
      files: ['packages/typescript-to-proptypes/src/**/*.ts'],
      rules: {
        // Working with flags is common in TypeScript compiler
        'no-bitwise': 'off',
      },
    },
  ],
};
