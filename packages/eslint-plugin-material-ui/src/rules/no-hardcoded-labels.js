const createEmojiRegex = require('emoji-regex');

module.exports = {
  meta: {
    messages: {
      'literal-label':
        "Don't use hardcoded labels. Prefer translated values by using `t` from the redux store.",
    },
  },
  create(context) {
    const { allow = [] } = context.options[0] || {};
    const emojiRegex = createEmojiRegex();

    return {
      Literal(node) {
        const canLabelComponent =
          node.parent.type === 'JSXElement' ||
          (node.parent.type === 'JSXAttribute' && ['aria-label'].includes(node.parent.name.name));

        const sanitizedValue = typeof node.value === 'string' ? node.value.trim() : node.value;
        const hasTranslateableContent = sanitizedValue !== '' && !emojiRegex.test(sanitizedValue);

        if (canLabelComponent && hasTranslateableContent && !allow.includes(sanitizedValue)) {
          context.report({ messageId: 'literal-label', node });
        }
      },
    };
  },
};
