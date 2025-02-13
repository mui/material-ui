const createEmojiRegex = require('emoji-regex');

const defaultAllow = ['API'];

module.exports = {
  meta: {
    messages: {
      'literal-label':
        "Don't use hardcoded labels. Prefer translated values by using `useTranslate`. New translations should be added to `docs/translations/translations.json`.",
    },
    schema: [
      {
        type: 'object',
        properties: {
          allow: {
            oneOf: [
              {
                type: 'array',
                items: {
                  type: 'string',
                },
              },
              {
                type: 'string',
              },
            ],
          },
        },
        additionalProperties: false,
      },
    ],
  },
  create(context) {
    const { allow: allowOption = [] } = context.options[0] || {};
    const emojiRegex = createEmojiRegex();

    const allow = defaultAllow.concat(allowOption);

    function valueViolatesRule(value) {
      const sanitizedValue = typeof value === 'string' ? value.trim() : value;
      const hasTranslateableContent =
        sanitizedValue !== '' && !emojiRegex.test(sanitizedValue) && /\w+/.test(sanitizedValue);

      return hasTranslateableContent && !allow.includes(sanitizedValue);
    }

    return {
      JSXExpressionContainer(node) {
        if (node.parent.type === 'JSXElement') {
          const isTemplateLiteral = node.expression.type === 'TemplateLiteral';
          const isStringLiteral =
            node.expression.type === 'Literal' && typeof node.expression.value === 'string';

          if ((isStringLiteral && valueViolatesRule(node.expression.value)) || isTemplateLiteral) {
            context.report({ messageId: 'literal-label', node });
          }
        }
      },
      JSXText(node) {
        if (node.parent.type === 'JSXElement') {
          if (valueViolatesRule(node.value)) {
            context.report({ messageId: 'literal-label', node });
          }
        }
      },
      Literal(node) {
        const canLabelComponent =
          node.parent.type === 'JSXElement' ||
          (node.parent.type === 'JSXAttribute' && ['aria-label'].includes(node.parent.name.name));

        if (canLabelComponent && valueViolatesRule(node.value)) {
          context.report({ messageId: 'literal-label', node });
        }
      },
    };
  },
};
