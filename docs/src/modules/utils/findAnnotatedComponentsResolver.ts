import { namedTypes as t, visit } from 'ast-types';
import { NodePath, Resolver } from 'react-docgen';

function isAnnotatedComponent(declaration: NodePath): boolean {
  // Check if we have:
  // /* @typescript-to-proptypes-generate */
  // const Component = ...
  const leadingComments = declaration.get('leadingComments');
  if (leadingComments === undefined) {
    return false;
  }
  return leadingComments.value.some(({ value }: { value: string }) => {
    return value.trim() === '@typescript-to-proptypes-generate';
  });
}

/**
 * @remarks Base on https://github.com/reactjs/react-docgen/blob/master/src/resolver/findExportedComponentDefinition.js
 * @param ast
 * @param parser
 * @param importer
 */
const findAnnotatedComponentsResolver: Resolver = (ast) => {
  let foundAnnotatedComponent: NodePath | undefined;

  function exportDeclaration(path: NodePath) {
    const declarationPath: NodePath = path.get('declaration');
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

export default findAnnotatedComponentsResolver;
