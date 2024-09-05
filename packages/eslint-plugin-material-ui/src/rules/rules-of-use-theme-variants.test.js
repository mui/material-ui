const eslint = require('eslint');
const rule = require('./rules-of-use-theme-variants');

const ruleTester = new eslint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    ecmaFeatures: { jsx: true },
  },
});
ruleTester.run('rules-of-use-theme-variants', rule, {
  valid: [
    // allowed but dangerous
    `
{
  const useCustomThemeVariants = props => useThemeVariants(props);
}`,
    `
{
  useThemeVariants(props);
}
`,
    `
{
  const { className, value: valueProp, ...other } = props;
  useThemeVariants(props);
}
`,
    `
{
  const { className, disabled = false, value: valueProp, ...other } = props;
  useThemeVariants({ ...props, disabled });
}
`,
    `
{
  const { className, value: valueProp, ...other } = props;
  const [stateA, setStateA] = React.useState(0);
  const [stateB, setStateB] = React.useState(0);
  useThemeVariants({ stateA, ...props, stateB });
}
`,
    // unnecessary spread but it's not the responsibility of this rule to catch "unnecessary" spread
    `
{
  const { className, value: valueProp, ...other } = props;
  useThemeVariants({ ...props});
}
  `,
  ],
  invalid: [
    {
      code: `
{
  const { disabled = false, ...other } = props;
  useThemeVariants({ ...props});
}
  `,
      errors: [
        {
          message: 'Prop `disabled` is not passed to `useThemeVariants` props.',
          line: 4,
          column: 20,
          endLine: 4,
          endColumn: 31,
        },
      ],
    },
    {
      code: `
{
  const { disabled = false, variant = 'text', ...other } = props;
  useThemeVariants({ ...props, disabled });
}
  `,
      errors: [
        {
          message: 'Prop `variant` is not passed to `useThemeVariants` props.',
          line: 4,
          column: 20,
          endLine: 4,
          endColumn: 42,
        },
      ],
    },
    {
      code: `
{
  const { disabled = false, ...other } = props;
  useThemeVariants({ disabled, ...props });
}
  `,
      errors: [
        {
          message:
            'The props spread must come first in the `useThemeVariants` props. Otherwise destructured props with default values could be overridden.',
          line: 4,
          column: 32,
          endLine: 4,
          endColumn: 40,
        },
      ],
    },
    // this is valid code but not analyzable by this rule
    {
      code: `
{
  const { disabled = false, ...other } = props;
  const themeVariantProps = { ...props, disabled };
  useThemeVariants(themeVariantProps);
}
  `,
      errors: [
        {
          message: "Can only analyze object patterns but found 'Identifier'. Prefer `{...props}`.",
          line: 5,
          column: 20,
          endLine: 5,
          endColumn: 37,
        },
      ],
    },
  ],
});
