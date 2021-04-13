const eslint = require('eslint');
const rule = require('./no-mutable-arrays');

const ruleTester = new eslint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    ecmaFeatures: { jsx: true },
  },
});
ruleTester.run('no-mutable-arrays', rule, {
  valid: [
    'type Pass = readonly T[];',
    'type Pass = MutableArray<T>;',
    'type Pass = ReadonlyArray<T>;',
  ],
  invalid: [
    {
      code: 'type Fail = T[];',
      errors: [
        {
          message:
            "Don't use implicit mutable arrays. Either use readonly arrays with `readonly T[]` or make the mutability explicit with `MutableArray<T>`.",
        },
      ],
    },
    {
      code: 'type Fail = Array<T>;',
      errors: [
        {
          message:
            "Don't use implicit mutable arrays. Either use readonly arrays with `ReadonlyArray<T>` or make the mutability explicit with `MutableArray<T>`.",
        },
      ],
    },
  ],
});
