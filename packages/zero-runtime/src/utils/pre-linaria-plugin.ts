import { addNamed } from '@babel/helper-module-imports';
import { declare } from '@babel/helper-plugin-utils';
import { sxObjectExtractor } from './sxObjectExtractor';

export const babelPlugin = declare((api) => {
  api.assertVersion(7);
  const { types: t } = api;
  return {
    name: '@mui/zero-babel-plugin',
    visitor: {
      JSXAttribute(path) {
        const namePath = path.get('name');
        const openingElement = path.findParent((p) => p.isJSXOpeningElement());
        if (
          !openingElement ||
          !openingElement.isJSXOpeningElement() ||
          !namePath.isJSXIdentifier() ||
          namePath.node.name !== 'sx'
        ) {
          return;
        }
        const tagName = openingElement.get('name');
        if (!tagName.isJSXIdentifier()) {
          return;
        }
        const valuePath = path.get('value');
        if (!valuePath.isJSXExpressionContainer()) {
          return;
        }
        const expressionPath = valuePath.get('expression');
        if (!expressionPath.isExpression()) {
          return;
        }
        if (!expressionPath.isObjectExpression() && !expressionPath.isArrowFunctionExpression()) {
          return;
        }
        sxObjectExtractor(expressionPath);
        const sxIdentifier = addNamed(namePath, 'sx', process.env.PACKAGE_NAME as string);
        expressionPath.replaceWith(
          t.callExpression(sxIdentifier, [expressionPath.node, t.identifier(tagName.node.name)]),
        );
      },
      ObjectProperty(path) {
        // @TODO - Maybe add support for React.createElement calls as well.
        // Right now, it only checks for jsx(),jsxs(),jsxDEV() and jsxsDEV() calls.
        const keyPath = path.get('key');
        if (!keyPath.isIdentifier() || keyPath.node.name !== 'sx') {
          return;
        }
        const valuePath = path.get('value');
        if (!valuePath.isObjectExpression() && !valuePath.isArrowFunctionExpression()) {
          return;
        }
        const parentJsxCall = path.findParent((p) => p.isCallExpression());
        if (!parentJsxCall || !parentJsxCall.isCallExpression()) {
          return;
        }
        const callee = parentJsxCall.get('callee');
        if (!callee.isIdentifier() || !callee.node.name.includes('jsx')) {
          return;
        }
        const jsxElement = parentJsxCall.get('arguments')[0];
        sxObjectExtractor(valuePath);
        const sxIdentifier = addNamed(keyPath, 'sx', process.env.PACKAGE_NAME as string);
        valuePath.replaceWith(t.callExpression(sxIdentifier, [valuePath.node, jsxElement.node]));
      },
    },
  };
});
