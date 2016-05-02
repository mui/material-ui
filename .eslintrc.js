module.exports = {
  // So parent files don't get applied
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  extends: 'eslint:recommended',
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
    }
  },
  plugins: [
    'babel',
    'react',
    'material-ui',
  ],
  rules: {
    // Errors
    'array-bracket-spacing': ['error', 'never'],
    'arrow-spacing': 'error',
    'arrow-parens': 'error',
    'block-spacing': ['error', 'always'],
    'brace-style': 'error',
    'comma-dangle': ['error', 'always-multiline'],
    'comma-spacing': ['error', {before: false, after: true}],
    'comma-style': ['error', 'last'],
    'computed-property-spacing': ['error', 'never'],
    'consistent-this': ['error', 'self'],
    'consistent-return': 'off', // Wishlist, one day
    'dot-notation': 'error',
    'dot-location': ['error', 'property'],
    'eqeqeq': ['error', 'smart'],
    'eol-last': 'error',
    'indent': ['error', 2, {SwitchCase: 1}],
    'id-blacklist': ['error', 'e'],
    'jsx-quotes': ['error', 'prefer-double'],
    'keyword-spacing': 'error',
    'key-spacing': 'error',
    'max-len': ['error', 120, 4],
    'new-cap': ['off', {capIsNew: true, newIsCap: true}], // Wishlist, one day
    'no-unused-expressions': 'error',
    'no-unused-vars': 'error',
    'no-shadow': 'off', // Wishlist, one day
    'no-spaced-func': 'error',
    'no-multiple-empty-lines': 'error',
    'no-multi-spaces': 'error',
    'no-undef': 'error',
    'no-empty-pattern': 'error',
    'no-dupe-keys': 'error',
    'no-dupe-args': 'error',
    'no-duplicate-case': 'error',
    'no-cond-assign': 'error',
    'no-extra-semi': 'error',
    'no-extra-boolean-cast': 'error',
    'no-trailing-spaces': 'error',
    'no-underscore-dangle': 'error',
    'no-unneeded-ternary': 'error',
    'no-unreachable': 'error',
    'no-var': 'error',
    'one-var': ['error', 'never'],
    'operator-linebreak': ['error', 'after'],
    'padded-blocks': ['error', 'never'],
    'prefer-arrow-callback': 'off', // Wishlist, one day
    'prefer-const': 'error',
    'prefer-template': 'error',
    'quotes': ['error', 'single', 'avoid-escape'],
    'semi': ['error', 'always'],
    'space-before-blocks': ['error', 'always'],
    'space-before-function-paren': ['error', 'never'],
    'space-infix-ops': 'error',
    'space-unary-ops': ['error', { words: true, nonwords: false }],
    'spaced-comment': 'error',
    'yoda': 'error',

    // Disabled
    'strict': 'off',
    'no-case-declarations': 'off',

    // Babel
    'babel/object-curly-spacing': ['error', 'never'],

    // React
    'react/display-name': 'error',
    'react/jsx-boolean-value': ['error', 'always'],
    'react/jsx-closing-bracket-location': 'error',
    'react/jsx-curly-spacing': 'error',
    'react/jsx-equals-spacing': 'error',
    'react/jsx-first-prop-new-line': ['error', 'multiline'],
    'react/jsx-handler-names': 'error',
    'react/jsx-indent-props': ['error', 2],
    'react/jsx-max-props-per-line': ['error', {maximum: 3}],
    'react/jsx-no-duplicate-props': 'error',
    'react/jsx-no-undef': 'error',
    'react/jsx-pascal-case': 'error',
    'react/jsx-space-before-closing': 'error',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/no-danger': 'error',
    'react/no-did-mount-set-state': 'error',
    'react/no-did-update-set-state': 'error',
    'react/no-direct-mutation-state': 'error',
    'react/no-multi-comp': 'off', // Wishlist, one day
    'react/no-unknown-property': 'error',
    'react/no-is-mounted': 'error',
    'react/prefer-arrow-callback': 'off', // Wishlist, one day
    'react/prefer-es6-class': 'error',
    'react/prop-types': 'error',
    'react/react-in-jsx-scope': 'error',
    'react/require-extension': 'error',
    'react/self-closing-comp': 'error',
    'react/sort-comp': 'error',
    'react/sort-prop-types': 'error',
    'react/wrap-multilines': 'error',
    'react/jsx-indent': ['error', 2],

    // React Disabled
    'react/jsx-no-bind': 'off',
    'react/jsx-no-literals': 'off',
    'react/jsx-sort-props': 'off',
    'react/no-set-state': 'off',

    // Material-UI
    'material-ui/docgen-ignore-before-comment': 'error',
  },
};
