const eslint = require('eslint');
const rule = require('./no-hardcoded-labels');

const ruleTester = new eslint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    ecmaFeatures: { jsx: true },
  },
});

ruleTester.run('no-hardcoded-labels', rule, {
  valid: [
    '<button>{42}</button>',
    '<button aria-label={t("a")} />',
    '<button data-label="a" />',
    '<button>{t("a")}</button>',
    '<button>{166}</button>',
    '<button> <TranslatedLabelAfterWhiteSpace /></button>',
    { code: '<a>MUI</a>', options: [{ allow: 'MUI' }] },
    '<span> ❤️</span>',
    `<button>{t("a")}{' '}</button>`,
    '<h2>{componentName} API</h2>',
    '<span>*</span>',
    '<span>.{className}</span>',
  ],
  invalid: [
    { code: '<button aria-label="a" />', errors: [{ messageId: 'literal-label' }] },
    { code: '<button>test<Component /></button>', errors: [{ messageId: 'literal-label' }] },
    { code: '<label>test<Component /></label>', errors: [{ messageId: 'literal-label' }] },
    { code: "<label>{'< Back to blog'}</label>", errors: [{ messageId: 'literal-label' }] },
    { code: '<label>{`< Back to blog`}</label>', errors: [{ messageId: 'literal-label' }] },
  ],
});
