const rule = {
  meta: {
    messages: {
      nameMismatch: "Expected `name` to be 'Mui{{ componentName }}' but instead got '{{ name }}'.",
      noComponent: 'Unable to find component for this call.',
      noNameProperty: 'Unable to find `name` property. Did you forget to pass `name`?',
      noNameValue:
        'Unable to resolve `name`. Please hardcode the `name` i.e. use a string literal.',
    },
  },
  create(context) {
    return {
      CallExpression(node) {
        const isUseThemePropsCall = node.callee.name === 'useThemeProps';
        if (isUseThemePropsCall) {
          const nameProperty = node.arguments[0].properties.find(
            (property) => property.key.name === 'name',
          );
          if (nameProperty === undefined) {
            context.report({ node: node.arguments[0], messageId: 'noNameProperty' });
            return;
          }
          if (nameProperty.value.type !== 'Literal') {
            context.report({ node: nameProperty.value, messageId: 'noNameValue' });
            return;
          }
          const name = nameProperty.value.value;

          let componentName = null;
          let parent = node.parent;
          while (parent != null && componentName === null) {
            if (parent.type === 'FunctionExpression' || parent.type === 'FunctionDeclaration') {
              componentName = parent.id.name;
            }

            parent = parent.parent;
          }

          if (componentName === null) {
            context.report({ node, messageId: 'noComponent' });
          } else if (name !== `Mui${componentName}`) {
            context.report({
              node: nameProperty.value,
              messageId: `nameMismatch`,
              data: { componentName, name },
            });
          }
        }
      },
    };
  },
};

module.exports = rule;
