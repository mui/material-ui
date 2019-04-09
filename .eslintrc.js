module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {},
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
  ],
  plugins: ['react', 'react-hooks', 'pretty-imports', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'pretty-imports/sorted': 'warn',
  },
};
