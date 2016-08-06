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
    'jsx-a11y',
    'mocha',
    'flowtype',
    'material-ui',
  ],
  rules: {
    'array-bracket-spacing': 'off', // use babel plugin rule
    'arrow-body-style': 'off',
    'arrow-parens': 'error',
    'consistent-this': ['error', 'self'],
    'func-names': 'off',
    'max-len': ['error', 120, 4], // airbnb use 100
    'newline-per-chained-call': 'off',
    'no-console': 'error', // airbnb have on warning
    'no-nested-ternary': 'off',
    'no-param-reassign': 'off', // wishlist, one day
    'no-prototype-builtins': 'off',
    'no-restricted-syntax': 'off',
    'no-return-assign': 'off',
    'no-use-before-define': ['error', { functions: false, classes: true }],
    'object-curly-spacing': 'off', // use babel plugin rule
    'operator-linebreak': ['error', 'after'],
    'quotes': ['error', 'single', 'avoid-escape'],
    'babel/object-curly-spacing': ['error', 'always'],
    'babel/array-bracket-spacing': ['error', 'never'],
    'import/no-unresolved': 'off',
    'import/no-named-as-default': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'react/jsx-handler-names': ['error', {
      eventHandlerPrefix: 'handle',
      eventHandlerPropPrefix: 'on',
    }],
    'react/jsx-filename-extension': ['error', {extensions: ['.js']}],
    'react/jsx-max-props-per-line': ['error', {maximum: 3}],
    'react/jsx-no-duplicate-props': 'error',
    'react/no-danger': 'error',
    'react/no-find-dom-node': 'warn',
    'react/no-direct-mutation-state': 'error',
    'react/no-set-state': 'off',
    'react/no-string-refs': 'error',
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
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/aria-proptypes': 'error',
    'jsx-a11y/aria-role': 'error',
    'jsx-a11y/img-has-alt': ['error', ['Avatar']],
    'jsx-a11y/role-supports-aria-props': 'error',
    'jsx-a11y/label-has-for': 'off',
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
