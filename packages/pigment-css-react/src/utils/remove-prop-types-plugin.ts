import { declare } from '@babel/helper-plugin-utils';

export const removePropTypesPlugin = declare<{}>((api) => {
  api.assertVersion(7);
  return {
    name: '@pigmentcss/wyw-remove-prop-types-plugin',
    visitor: {
      AssignmentExpression(path) {
        const left = path.get('left');
        if (!left.isMemberExpression()) {
          return;
        }
        const property = left.get('property');
        if (!property.isIdentifier({ name: 'propTypes' })) {
          return;
        }
        if (path.parentPath.isExpressionStatement()) {
          path.parentPath.remove();
        }
      },
    },
  };
});
