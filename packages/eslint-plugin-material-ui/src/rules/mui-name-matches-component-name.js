/**
 * @type {import('eslint').Rule.RuleModule}
 */
const rule = {
  meta: {
    messages: {
      nameMismatch: "Expected `name` to be 'Mui{{ componentName }}' but instead got '{{ name }}'.",
      noComponent: 'Unable to find component for this call.',
      noNameProperty: 'Unable to find `name` property. Did you forget to pass `name`?',
      noNameSecondArgument:
        "Unable to find name argument. Expected `{{ customHook }}(firstParameter, 'MuiComponent')`.",
      noNameValue:
        'Unable to resolve `name`. Please hardcode the `name` i.e. use a string literal.',
    },
    schema: [
      {
        type: 'object',
        properties: {
          customHooks: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
        additionalProperties: false,
      },
    ],
  },
  create(context) {
    const [options = {}] = context.options;
    const { customHooks = [] } = options;

    function resolveUseThemePropsNameLiteral(node) {
      if (!node.arguments[0].properties) {
        return null;
      }
      const nameProperty = node.arguments[0].properties.find(
        (property) => property.key.name === 'name',
      );
      if (nameProperty === undefined) {
        context.report({ node: node.arguments[0], messageId: 'noNameProperty' });
        return null;
      }
      if (nameProperty.value.type !== 'Literal') {
        context.report({ node: nameProperty.value, messageId: 'noNameValue' });
        return null;
      }
      return nameProperty.value;
    }

    function resolveCustomHookNameLiteral(node) {
      const secondArgument = node.arguments[1];
      if (secondArgument === undefined) {
        context.report({
          node: node.arguments[0],
          messageId: 'noNameSecondArgument',
          data: { customHook: node.callee.name },
        });
        return null;
      }
      if (secondArgument.type !== 'Literal') {
        context.report({ node: secondArgument, messageId: 'noNameValue' });
        return null;
      }
      return secondArgument;
    }

    return {
      CallExpression(node) {
        let nameLiteral = null;
        const isUseDefaultPropsCall =
          node.callee.name === 'useDefaultProps' || node.callee.name === 'useThemeProps';
        if (isUseDefaultPropsCall) {
          let isCalledFromCustomHook = false;
          let parent = node.parent;
          while (parent != null) {
            if (parent.type === 'FunctionExpression' || parent.type === 'FunctionDeclaration') {
              if (customHooks.includes(parent.id.name)) {
                isCalledFromCustomHook = true;
              }
              break;
            }

            parent = parent.parent;
          }
          if (!isCalledFromCustomHook) {
            nameLiteral = resolveUseThemePropsNameLiteral(node);
          }
        } else if (customHooks.includes(node.callee.name)) {
          nameLiteral = resolveCustomHookNameLiteral(node);
        }

        if (nameLiteral !== null) {
          let componentName = null;
          let parent = node.parent;
          while (parent != null && componentName === null) {
            if (parent.type === 'FunctionExpression' || parent.type === 'FunctionDeclaration') {
              componentName = parent.id.name;
            }

            if (
              parent.type === 'VariableDeclarator' &&
              parent.init.type.match(/(CallExpression|TSAsExpression)/)
            ) {
              const callee =
                parent.init.type === 'TSAsExpression'
                  ? parent.init.expression.callee
                  : parent.init.callee;
              if (callee.name.includes(parent.id.name)) {
                // For component factory, for example const Container = createContainer({ ... })
                componentName = parent.id.name;
              }
            }

            parent = parent.parent;
          }

          const name = nameLiteral.value;
          if (componentName === null) {
            context.report({ node, messageId: 'noComponent' });
          } else if (name !== `Mui${componentName}`) {
            context.report({
              node: nameLiteral,
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
