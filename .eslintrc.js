module.exports = {
  // So parent files don't get applied
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  extends: 'airbnb',
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
  },
  plugins: [
    'babel',
    'mocha',
    'material-ui',
  ],
  rules: {
    // Errors
    'array-bracket-spacing': 'off', // use babel plugin rule
    'arrow-body-style': 'off',
    'arrow-parens': 'error',
    'consistent-this': ['error', 'self'],
    'max-len': ['error', 120, 4],
    'new-cap': ['off', {capIsNew: true, newIsCap: true}], // Wishlist, one day
    'newline-per-chained-call': 'off',
    'no-nested-ternary': 'off',
    'no-param-reassign': 'off', // wishlist, one day
    'no-restricted-syntax': 'off',
    'no-return-assign': 'off',
    'no-use-before-define': ['error', { functions: false, classes: true }],
    'object-curly-spacing': 'off', // use babel plugin rule
    'operator-linebreak': ['error', 'after'],
    'quotes': ['error', 'single', 'avoid-escape'],

    // Babel
    'babel/object-curly-spacing': ['error', 'always'],
    'babel/array-bracket-spacing': ['error', 'never'],

    // Misc
    'import/no-unresolved': 'off',

    // React
    'react/jsx-handler-names': ['error', {
      eventHandlerPrefix: 'handle',
      eventHandlerPropPrefix: 'on',
    }],

    'react/jsx-max-props-per-line': ['error', {maximum: 3}],
    'react/jsx-no-duplicate-props': 'error',
    'react/no-danger': 'error',
    'react/no-direct-mutation-state': 'error',
    'react/prefer-stateless-function': 'off', // wishlist, one day
    'react/sort-comp': [2, {
      order: [
        'static-methods',
        'lifecycle',
        // 'properties', // not real -- NEEDS A PR!!!
        // '/^handle.+$/', // wishlist -- needs above first
        // '/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/', // wishlist -- needs above first
        'everything-else',
        '/^render.+$/',
        'render'
      ],
    }],

    // React Disabled
    // 'react/jsx-no-bind': 'off',
    'react/no-set-state': 'off',

    // Material-UI
    'material-ui/docgen-ignore-before-comment': 'error',

    'mocha/handle-done-callback': 'error',
    'mocha/no-exclusive-tests': 'error',
    'mocha/no-global-tests': 'error',
    'mocha/no-pending-tests': 'error',
    'mocha/no-skipped-tests': 'error',
  },
};
