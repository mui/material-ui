// eslint-disable-next-line material-ui/straight-quotes
const nonStraightQuotes = /[‘’“”]/mg;

/**
 * @type {import('eslint').Rule.RuleModule}
 */
const rule = {
  meta: {
    docs: {
      description: 'Only allow straight quotes. Curly quotes can still be used but in specific context where relevant.',
    },
    messages: {
      wrongQuotes: 'Only allow straight quotes. Curly quotes can still be used but in specific context where relevant.',
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
      }
    };
  },
};

module.exports = rule;
