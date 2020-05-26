/**
 * Evaluates a babel node as a string.
 *
 * Supported nodes
 * - `'just a literal'`
 * - `'a literal' + 'concateneded' + 'with +'`
 * Cannot evaluate template literals or Array.prototype.join etc.
 *
 * @param {import('@babel/core').types.Node} node
 * @param {typeof import('@babel/core')} babel
 */
module.exports = function evaluateMessage(node, babel) {
  if (babel.types.isBinaryExpression(node)) {
    if (node.operator !== '+') {
      throw new Error(`Unsupported binary operator '${node.operator}'. Can only evaluate '+'.`);
    }
    return `${evaluateMessage(node.left, babel)}${evaluateMessage(node.right, babel)}`;
  }
  if (babel.types.isStringLiteral(node)) {
    return node.value;
  }
  throw new Error('Can only evaluate strings that are concatenated with `+` or string literals.');
};
