module.exports = {
  // So parent files don't get applied
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true,
    mocha: true,
  },
  extends: [
    'airbnb',
    'plugin:import/recommended',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
  },
  plugins: [
    'babel',
    'import',
    'jsx-a11y',
    'mocha',
    'flowtype',
    'material-ui',
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.config.js',
      },
    },
  },
  rules: {
    'arrow-body-style': 'off', // Not our taste?
    'arrow-parens': ['error', 'always'], // airbnb use as-needed
    'consistent-this': ['error', 'self'],
    'import/unambiguous': 'off',
    'max-len': ['error', 100, 2, {
      ignoreUrls: true,
    }], // airbnb is allowing some edge cases
    'no-console': 'error', // airbnb is using warn
    'no-alert': 'error', // airbnb is using warn
    'no-param-reassign': 'off', // Not our taste?
    'no-prototype-builtins': 'off', // airbnb use error
    'no-use-before-define': ['error', { functions: false }], // airbnb have functions: true, annoying
    'object-curly-spacing': 'off', // use babel plugin rule
    'operator-linebreak': ['error', 'after'], // aibnb is disabling this rule
    'babel/object-curly-spacing': ['error', 'always'],
    'no-restricted-properties': 'off', // To remove once react-docgen support ** operator.
    'import/no-unresolved': 'off',
    'import/no-named-as-default': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'react/jsx-handler-names': ['error', { // airbnb is disabling this rule
      eventHandlerPrefix: 'handle',
      eventHandlerPropPrefix: 'on',
    }],
    'react/require-default-props': 'off', // airbnb use error
    'react/forbid-prop-types': 'off', // airbnb use error
    'react/jsx-filename-extension': ['error', {extensions: ['.js']}], // airbnb is using .jsx
    'react/jsx-max-props-per-line': ['error', {maximum: 3}], // airbnb is disabling this rule
    'react/no-danger': 'error', // airbnb is using warn
    'react/no-direct-mutation-state': 'error', // airbnb is disabling this rule
    'react/no-find-dom-node': 'off', // I don't know
    'react/no-unused-prop-types': 'off', // Is still buggy
    'react/sort-prop-types': 'error', // airbnb do nothing here.
    'react/sort-comp': [2, {
      order: [
        'type-annotations',
        'static-methods',
        'props',
        'lifecycle',
        // '/^handle.+$/', // wishlist -- needs above first
        // '/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/', // wishlist -- needs above first
        'everything-else',
        '/^render.+$/',
        'render'
      ],
    }],
    'material-ui/docgen-ignore-before-comment': 'error',
    'mocha/handle-done-callback': 'error',
    'mocha/no-exclusive-tests': 'error',
    'mocha/no-global-tests': 'error',
    'mocha/no-pending-tests': 'error',
    'mocha/no-skipped-tests': 'error',
    'flowtype/require-valid-file-annotation': ['error', 'always'],
    'flowtype/require-parameter-type': 'off',
    'flowtype/require-return-type': 'off',
    'flowtype/space-after-type-colon': 'off',
    'flowtype/space-before-type-colon': 'off',
    'flowtype/type-id-match': 'off',
  },
};
