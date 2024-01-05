// eslint-disable-next-line material-ui/straight-quotes
const nonStraightQuotes = /[‘’“”]/gm;

/**
 * @type {import('eslint').Rule.RuleModule}
 */
const rule = {
  meta: {
    docs: {
      description:
        'Only allow straight quotes. Curly quotes can still be used but in specific context where relevant.',
    },
    messages: {
      wrongQuotes:
        'Only allow straight quotes. Curly quotes can still be used but in specific context where relevant.',
    },
    // fixable: 'code', TODO
    type: 'suggestion',
    schema: [],
  },
  create(context) {
    return {
      Program(node) {
        const value = context.sourceCode.text;
        let match;

        // eslint-disable-next-line no-cond-assign
        while ((match = nonStraightQuotes.exec(value)) !== null) {
          context.report({
            node,
            loc: {
              start: context.sourceCode.getLocFromIndex(match.index),
              end: context.sourceCode.getLocFromIndex(match.index + 1),
            },
            messageId: 'wrongQuotes',
          });
        }
      },
    };
  },
};

module.exports = rule;
