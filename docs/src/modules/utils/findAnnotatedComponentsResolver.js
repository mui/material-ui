// @ts-check
const { namedTypes: t, visit } = require('ast-types');

/**
 * @param {import('react-docgen').NodePath} declaration
 * @returns {boolean}
 */
function isAnnotatedComponent(declaration) {
  // Check if we have:
  // /* @typescript-to-proptypes-generate */
  // const Component = ...
  /**
   * @type {import('react-docgen').NodePath<import('react-docgen').ASTNode, t.Comment[]>}
   */
  const leadingComments = declaration.get('leadingComments');
  if (leadingComments.value === undefined) {
    return false;
  }

  return leadingComments.value.some(({ value }) => {
    return value.trim() === '@typescript-to-proptypes-generate';
  });
}

/**
 * @remarks Base on https://github.com/reactjs/react-docgen/blob/master/src/resolver/findExportedComponentDefinition.js
 * @type {import('react-docgen').Resolver}
 */
const findAnnotatedComponentsResolver = (ast) => {
  /**
   * @type {import('react-docgen').NodePath | undefined}
   */
  let foundAnnotatedComponent;

  /**
   * @param {import('react-docgen').NodePath} path
   * @returns {boolean}
   */
  function exportDeclaration(path) {
    /**
     * @type {import('react-docgen').NodePath}
     */
    const declarationPath = path.get('declaration');
    if (t.Identifier.check(declarationPath.node)) {
      const exportedValueScope = path.scope.lookup(declarationPath.node.name);
      const exportedValueScopeBindings = exportedValueScope.getBindings();
      const [exportedValueBinding] = exportedValueScopeBindings[declarationPath.node.name];
      // `exportedValueBinding` points to `Component` in `const Component`;
      // `exportedValueBinding.parentPath` is the `VariableDeclarator`
      // `exportedValueBinding.parentPath.parentPath` is the `VariableDeclaration`
      // `exportedValueBinding.parentPath.parentPath.parentPath` is the `VariableDeclaration` as well
      const declaration = exportedValueBinding.parentPath.parentPath.parentPath;

      if (isAnnotatedComponent(declaration)) {
        if (foundAnnotatedComponent !== undefined) {
          throw new Error('Unable to handle multiple annotated components.');
        }

        foundAnnotatedComponent = declaration;
      }
    }

    return false;
  }

  visit(ast, {
    visitExportDefaultDeclaration: exportDeclaration,
  });

  return foundAnnotatedComponent;
};

module.exports = findAnnotatedComponentsResolver;
module.exports.isAnnotatedComponent = isAnnotatedComponent;
