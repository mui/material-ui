const eslint = require('eslint');
const rule = require('./unused-style-rule');

const ruleTester = new eslint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    ecmaFeatures: { jsx: true },
  },
});
ruleTester.run('unused-style-rule', rule, {
  valid: [
    `const useStyles = makeStyles(() => ({
      testClass: {
        backgroundColor: 'red'
      }
    }))

    const Component = () => {
      const classes = useStyles()
      return <div className={classes.testClass}>test</div>
    }`,
  ],
  invalid: [
    {
      code: `const useStyles = makeStyles(() => ({
        testClass: {
          backgroundColor: 'red'
        }
      }))

      const Component = () => {
        const classes = useStyles()
        return <div>test</div>
      }`,
      errors: [
        {
          message: 'Class `testClass` is unused',
        },
      ],
    },
  ],
});
