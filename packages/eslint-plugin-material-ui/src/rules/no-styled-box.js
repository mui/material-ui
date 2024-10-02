// Copy from https://github.com/eslint/eslint/blob/95075251fb3ce35aaf7eadbd1d0a737106c13ec6/lib/rules/utils/ast-utils.js#L299
// Why is this not exported by ESLint?
/**
 * Retrieve `ChainExpression#expression` value if the given node a `ChainExpression` node. Otherwise, pass through it.
 * @param {ASTNode} node The node to address.
 * @returns {ASTNode} The `ChainExpression#expression` value if the node is a `ChainExpression` node. Otherwise, the node.
 */
function skipChainExpression(node) {
  return node && node.type === 'ChainExpression' ? node.expression : node;
}

/**
 * @type {import('eslint').Rule.RuleModule}
 */
const rule = {
  meta: {
    docs: {
      description: 'Disallow use of styled(Box), we prefer the sx prop over system props.',
    },
    messages: {
      noBox: "The use of styled(Box) is not allowed, use styled('div') instead.",
    },
    type: 'suggestion',
    fixable: 'code',
    schema: [],
  },
  create(context) {
    return {
      CallExpression(node) {
        const callee = skipChainExpression(node.callee);
        if (callee.type !== 'Identifier') {
          return;
        }
        if (callee.name !== 'styled') {
          return;
        }
        if (!node.arguments[0]) {
          return;
        }

        if (node.arguments[0].type === 'Identifier' && node.arguments[0].name === 'Box') {
          context.report({
            node,
            messageId: 'noBox',
            fix: (fixer) => {
              return fixer.replaceText(node.arguments[0], "'div'");
            },
          });
        }
      },
    };
  },
};

module.exports = rule;
