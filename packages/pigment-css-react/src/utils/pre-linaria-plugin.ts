import { addNamed } from '@babel/helper-module-imports';
import { declare } from '@babel/helper-plugin-utils';
import { NodePath } from '@babel/core';
import * as Types from '@babel/types';
import { sxPropConverter } from './sxPropConverter';

function replaceNodePath(
  expressionPath: NodePath<Types.Expression>,
  namePath: NodePath<Types.JSXIdentifier | Types.Identifier>,
  importName: string,
  t: typeof Types,
  tagName: NodePath<Types.JSXIdentifier | Types.Identifier>,
) {
  const sxIdentifier = addNamed(namePath, importName, process.env.PACKAGE_NAME as string);

  const wrapWithSxCall = (expPath: NodePath<Types.Expression>) => {
    expPath.replaceWith(
      t.callExpression(sxIdentifier, [expPath.node, t.identifier(tagName.node.name)]),
    );
  };

  sxPropConverter(expressionPath, wrapWithSxCall);
}

export const babelPlugin = declare<{ propName?: string; importName?: string }>(
  (api, { propName = 'sx', importName = 'sx' }) => {
    api.assertVersion(7);
    const { types: t } = api;
    return {
      name: '@pigmentcss/zero-babel-plugin',
      visitor: {
        JSXAttribute(path) {
          const namePath = path.get('name');
          const openingElement = path.findParent((p) => p.isJSXOpeningElement());
          if (
            !openingElement ||
            !openingElement.isJSXOpeningElement() ||
            !namePath.isJSXIdentifier() ||
            namePath.node.name !== propName
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
          replaceNodePath(expressionPath, namePath, importName, t, tagName);
        },
        ObjectProperty(path) {
          // @TODO - Maybe add support for React.createElement calls as well.
          // Right now, it only checks for jsx(),jsxs(),jsxDEV() and jsxsDEV() calls.
          const keyPath = path.get('key');
          if (!keyPath.isIdentifier() || keyPath.node.name !== propName) {
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
          const jsxElement = parentJsxCall.get('arguments')[0] as NodePath<Types.Identifier>;
          replaceNodePath(valuePath, keyPath, importName, t, jsxElement);
        },
      },
    };
  },
);
