module.exports = {
  create(context) {
    let hasUseClientDirective = false;
    const apis = new Set([
      'useState',
      'useEffect',
      'useLayoutEffect',
      'useReducer',
      'useTransition',
      'createContext',
    ]);
    return {
      Program(node) {
        hasUseClientDirective = node.body.some(
          (statement) =>
            statement.type === 'ExpressionStatement' &&
            statement.expression.type === 'Literal' &&
            statement.expression.value === 'use client',
        );
      },
      CallExpression(node) {
        if (
          !hasUseClientDirective &&
          node.callee.type === 'MemberExpression' &&
          node.callee.object.name === 'React' &&
          apis.has(node.callee.property.name)
        ) {
          context.report({
            node,
            message: `Using 'React.${node.callee.property.name}' is forbidden if the file doesn't have a 'use client' directive.`,
            fix(fixer) {
              const sourceCode = context.getSourceCode();
              if (
                sourceCode.text.includes('"use server"') ||
                sourceCode.text.includes("'use server'")
              ) {
                return null;
              }

              const firstToken = sourceCode.ast.body[0];
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
};
