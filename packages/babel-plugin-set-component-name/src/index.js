module.exports = ({ template, types: t }) => {
  function getDisplayName(paths) {
    let name;

    paths.some(nodePath => {
      const { node } = nodePath;
      if (
        // componentName.propTypes = ...
        t.isExpressionStatement(node) &&
        t.isAssignmentExpression(node.expression, { operator: '=' }) &&
        t.isMemberExpression(node.expression.left)
      ) {
        // componentName.propTypes
        const expr = node.expression.left;
        if (t.isIdentifier(expr.object) && t.isIdentifier(expr.property, { name: 'propTypes' })) {
          name = `Mui${expr.object.name}`;

          if (process.env.NODE_ENV !== 'production') {
            nodePath.insertBefore(template.ast(`export const muiDisplayName = '${name}';`));
          }
          return true;
        }
      }
      return false;
    });

    return name;
  }

  return {
    visitor: {
      Program(path, state) {
        if (
          // Skip files in node_modules
          /node_modules/.test(state.filename) ||
          // See if file contains prop-types import
          !path.node.body.some(
            node =>
              t.isImportDeclaration(node) &&
              t.isStringLiteral(node.source, { value: 'prop-types' }),
          )
        ) {
          return;
        }

        const paths = path.get('body');

        getDisplayName(paths);
      },
    },
  };
};
