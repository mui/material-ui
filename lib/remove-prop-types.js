const removePropTypes = (api) => {
  const { types, template } = api;
  const visitedKey = `remove-prop-types-${Date.now()}`;
  return {
    visitor: {
      AssignmentExpression(path) {
        if (
          types.isMemberExpression(path.node.left) &&
          types.isIdentifier(path.node.left.property) &&
          path.node.left.property.name === 'propTypes'
        ) {
          // Prevent infinity loop.
          if (path.node[visitedKey]) {
            return;
          }
          path.node[visitedKey] = true;

          const unsafeWrapTemplate = template(
            `
              if (process.env.NODE_ENV !== "production") {
                NODE;
              }
            `,
            { placeholderPattern: /^NODE$/ }
          );
          path.replaceWith(
            unsafeWrapTemplate({
              NODE: path.node,
            })
          );
        }
      },
    },
  };
};

module.exports = removePropTypes;
