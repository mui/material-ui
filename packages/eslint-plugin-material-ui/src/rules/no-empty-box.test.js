const eslint = require('eslint');
const rule = require('./no-empty-box');

const ruleTester = new eslint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    ecmaFeatures: { jsx: true },
  },
});

ruleTester.run('no-empty-box', rule, {
  valid: ['<Box sx={{ width: 1 }}>Foo</Box>', '<Box sx={{ width: 1 }} />', '<Box {...props} />'],
  invalid: [
    {
      code: '<Box>Foo</Box>',
      errors: [
        {
          messageId: 'emptyBox',
          type: 'JSXOpeningElement',
          data: {
            component: 'div',
          },
        },
      ],
    },
    {
      code: '<Box component="span">Foo</Box>',
      errors: [
        {
          messageId: 'emptyBox',
          type: 'JSXOpeningElement',
          data: {
            component: 'span',
          },
        },
      ],
    },
  ],
});
