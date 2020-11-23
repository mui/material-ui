function getBasicIdentifier(node) {
  if (node.type === 'Identifier') {
    // classes.foo
    return node.name;
  }

  if (node.type === 'Literal') {
    // classes['foo']
    return node.value;
  }

  if (node.type === 'TemplateLiteral') {
    // classes[`foo`]
    if (node.expressions.length) {
      // classes[`foo${bar}`]
      return null;
    }
    return node.quasis[0].value.raw;
  }

  // Might end up here with things like:
  // classes['foo' + bar]
  return null;
}

module.exports = {
  meta: {
    type: 'problem',
  },
  create: function rule(context) {
    const usedClasses = {};
    const definedClasses = {};

    return {
      CallExpression(node) {
        if (node.callee.name === 'makeStyles') {
          const styles = node.arguments[0];

          if (styles && styles.type === 'ArrowFunctionExpression') {
            const { body } = styles;

            let stylesObj;
            if (body.type === 'ObjectExpression') {
              stylesObj = body;
            } else if (body.type === 'BlockStatement') {
              body.body.forEach((bodyNode) => {
                if (
                  bodyNode.type === 'ReturnStatement' &&
                  bodyNode.argument.type === 'ObjectExpression'
                ) {
                  stylesObj = bodyNode.argument;
                }
              });
            }

            if (stylesObj) {
              stylesObj.properties.forEach((property) => {
                if (property.computed) {
                  // Skip over computed properties for now.
                  // e.g. `{ [foo]: { ... } }`
                  return;
                }

                if (
                  property.type === 'ExperimentalSpreadProperty' ||
                  property.type === 'SpreadElement'
                ) {
                  // Skip over object spread for now.
                  // e.g. `{ ...foo }`
                  return;
                }

                if (property.key.type === 'Literal' && property.key.value === '@global') {
                  return;
                }

                definedClasses[property.key.name] = property;
              });
            }
          }
        }
      },

      MemberExpression(node) {
        if (node.object.type === 'Identifier' && node.object.name === 'classes') {
          const whichClass = getBasicIdentifier(node.property);
          if (whichClass) {
            usedClasses[whichClass] = true;
          }
          return;
        }

        const classIdentifier = getBasicIdentifier(node.property);
        if (!classIdentifier) {
          // props['foo' + bar].baz
          return;
        }

        if (classIdentifier !== 'classes') {
          // props.foo.bar
          return;
        }

        const { parent } = node;

        if (parent.type !== 'MemberExpression') {
          // foo.styles
          return;
        }

        if (node.object.object && node.object.object.type !== 'ThisExpression') {
          // foo.foo.styles
          return;
        }

        const propsIdentifier = getBasicIdentifier(parent.object);
        if (propsIdentifier && propsIdentifier !== 'props') {
          return;
        }
        if (!propsIdentifier && parent.object.type !== 'MemberExpression') {
          return;
        }

        if (parent.parent.type === 'MemberExpression') {
          // this.props.props.styles
          return;
        }

        const parentClassIdentifier = getBasicIdentifier(parent.property);
        if (parentClassIdentifier) {
          usedClasses[parentClassIdentifier] = true;
        }
      },
      'Program:exit': () => {
        // Now we know all of the defined classes and used classes, so we can
        // see if there are any defined classes that are not used.
        Object.keys(definedClasses).forEach((definedClassKey) => {
          if (!usedClasses[definedClassKey]) {
            context.report(
              definedClasses[definedClassKey],
              `Class \`${definedClassKey}\` is unused`,
            );
          }
        });
      },
    };
  },
};
