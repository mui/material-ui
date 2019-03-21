/**
 *
 * @param {babel.types.ImportDeclaration} param0
 */
function isImportFromStyles({ source }) {
  return source.value === '@material-ui/core/styles' || source.value === '@material-ui/styles';
}

/**
 *
 * @param {babel.types.CallExpression} param0
 */
function isCreateStylesCall({ callee }) {
  return callee.name === 'createStyles';
}

/**
 *
 * @param {babel.types.ImportSpecifier} param0
 */
function isCreateStylesImportSepcifier({ imported }) {
  return imported.name === 'createStyles';
}

/**
 * @param {babel.types.CallExpression} expression
 */
function unwrapCallExpression(expression) {
  if (expression.arguments.length !== 1) {
    throw new Error('need exactly one argument');
  }

  return expression.arguments[0];
}

module.exports = function unwrapCreateStyles({ types: t }) {
  return {
    visitor: {
      CallExpression(path) {
        if (isCreateStylesCall(path.node)) {
          path.replaceWith(unwrapCallExpression(path.node, t));
        }
      },
      ImportSpecifier(path) {
        if (isImportFromStyles(path.parent) && isCreateStylesImportSepcifier(path.node)) {
          path.remove();
        }
      },
    },
  };
};
