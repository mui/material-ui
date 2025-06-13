/// @ts-check

const REACT_CLIENT_APIS = new Set([
  'useState',
  'useEffect',
  'useLayoutEffect',
  'useReducer',
  'useTransition',
  'createContext',
]);

/**
 * @param {import('eslint').AST.Program} ast
 * @param {string} directive
 * @returns
 */
function hasDirective(ast, directive) {
  return ast.body.some(
    (statement) =>
      statement.type === 'ExpressionStatement' &&
      statement.expression.type === 'Literal' &&
      statement.expression.value === directive,
  );
}

module.exports = /** @type {import('eslint').Rule.RuleModule} */ ({
  create(context) {
    let hasUseClientDirective = false;
    let hasUseServerDirective = false;
    return {
      /** @param {import('eslint').AST.Program} node */
      Program(node) {
        hasUseServerDirective = hasDirective(node, 'use server');
        hasUseClientDirective = hasDirective(node, 'use client');
      },
      CallExpression(node) {
        if (
          !hasUseClientDirective &&
          node.callee.type === 'MemberExpression' &&
          node.callee.object.type === 'Identifier' &&
          node.callee.object.name === 'React' &&
          node.callee.property.type === 'Identifier' &&
          REACT_CLIENT_APIS.has(node.callee.property.name)
        ) {
          context.report({
            node,
            message: `Using 'React.${node.callee.property.name}' is forbidden if the file doesn't have a 'use client' directive.`,
            fix(fixer) {
              if (hasUseServerDirective) {
                return null;
              }

              const firstToken = context.sourceCode.ast.body[0];
              return fixer.insertTextBefore(firstToken, "'use client';\n");
            },
          });
        }
      },
    };
  },
  meta: {
    fixable: 'code',
  },
});
