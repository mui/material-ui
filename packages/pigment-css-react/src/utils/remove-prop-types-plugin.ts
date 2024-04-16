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
        const isPropTypes = property.isIdentifier({ name: 'propTypes' });
        const isMuiName = property.isIdentifier({ name: 'muiName' });

        if (!isPropTypes && !isMuiName) {
          return;
        }
        const parentExpression = path.findParent((p) => p.isExpressionStatement());
        if (parentExpression) {
          parentExpression.remove();
        }
      },
    },
  };
});
