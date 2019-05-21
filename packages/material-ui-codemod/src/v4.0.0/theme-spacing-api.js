/* eslint-disable no-eval */
/**
 * Update all `theme.spacing.unit` usages to use `theme.spacing()`.
 * Find and replace string literal AST nodes to ensure all spacing API usages get updated, regardless
 * of any calculation being performed.
 * @param {jscodeshift_api_object} j
 * @param {jscodeshift_ast_object} root
 */
function transformThemeSpacingApi(j, root) {
  const spacingPath = root.find(j.MemberExpression, {
    object: {
      object: {
        name: 'theme',
      },
      property: {
        name: 'spacing',
      },
    },
    property: {
      name: 'unit',
    },
  });

  spacingPath.replaceWith(path => {
    let param = null;

    if (j.BinaryExpression.check(path.parent.node)) {
      const expression = path.parent.node;
      const operation = expression.operator;

      // check if it's a variable
      if (j.Identifier.check(expression.right)) {
        param = expression.right;
      } else if (j.Literal.check(expression.right)) {
        const value = expression.right.value;
        if (operation === '*' || operation === '/') {
          param = j.literal(eval(`1 ${operation} ${value}`));
        }
      }
    }

    if (param) {
      path.parent.replace(
        j.callExpression(j.memberExpression(j.identifier('theme'), j.identifier('spacing')), [
          param,
        ]),
      );
      return path.node;
    }
    return j.callExpression(j.memberExpression(j.identifier('theme'), j.identifier('spacing')), [
      j.literal(1),
    ]);
  });
}

module.exports = function transformer(fileInfo, api) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  // transforms
  transformThemeSpacingApi(j, root);
  return root.toSource({ quote: 'single' });
};
