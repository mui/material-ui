module.exports = {
  meta: {
    messages: {
      implicitMutable:
        "Don't use implicit mutable arrays. Either use readonly arrays with `{{suggestion}}` or make the mutability explicit with `MutableArray<T>`.",
    },
  },
  create(context) {
    return {
      TSTypeReference(node) {
        if (node.typeName.name === 'Array') {
          context.report({
            node,
            messageId: 'implicitMutable',
            data: { suggestion: 'ReadonlyArray<T>' },
          });
        }
      },
      TSArrayType(node) {
        const isReadonly =
          node.parent.type === 'TSTypeOperator' && node.parent.operator === 'readonly';
        if (!isReadonly) {
          context.report({
            node,
            messageId: 'implicitMutable',
            data: { suggestion: 'readonly T[]' },
          });
        }
      },
    };
  },
};
