import { addNamed } from '@babel/helper-module-imports';
import { declare } from '@babel/helper-plugin-utils';
import { NodePath } from '@babel/core';
import * as Types from '@babel/types';

import { sxPropConverter } from './sxPropConverter';

function convertJsxMemberExpressionToMemberExpression(
  t: typeof Types,
  nodePath: NodePath<Types.JSXMemberExpression>,
): Types.MemberExpression {
  const object = nodePath.get('object');
  const property = nodePath.get('property');

  if (object.isJSXMemberExpression()) {
    return t.memberExpression(
      convertJsxMemberExpressionToMemberExpression(t, object),
      t.identifier(property.node.name),
    );
  }
  return t.memberExpression(
    t.identifier((object.node as Types.JSXIdentifier).name),
    t.identifier(property.node.name),
  );
}

function wrapWithSxComponent(
  t: typeof Types,
  tagNamePath: NodePath<Types.JSXIdentifier | Types.JSXMemberExpression | Types.JSXNamespacedName>,
  sxComponentName: string,
) {
  const sxComponent = addNamed(
    tagNamePath,
    sxComponentName,
    `${process.env.PACKAGE_NAME}/private-runtime`,
  );
  const jsxElement = tagNamePath.findParent((p) => p.isJSXElement());
  if (!jsxElement?.isJSXElement()) {
    return;
  }
  const component = t.jsxIdentifier(sxComponent.name);

  const newChildren = (jsxElement.get('children') ?? []).map((child) => child.node);
  let sxComponentValue: Types.Identifier | Types.MemberExpression | null = null;

  if (tagNamePath.isJSXIdentifier()) {
    sxComponentValue = t.identifier(tagNamePath.node.name);
  } else if (tagNamePath.isJSXMemberExpression()) {
    sxComponentValue = convertJsxMemberExpressionToMemberExpression(t, tagNamePath);
  }

  const newElement = t.jsxElement(
    t.jsxOpeningElement(
      component,
      [
        t.jsxAttribute(
          t.jsxIdentifier('sxComponent'),
          t.jsxExpressionContainer(sxComponentValue ?? t.nullLiteral()),
        ),
        ...jsxElement
          .get('openingElement')
          .get('attributes')
          .map((attr) => attr.node),
      ],
      !newChildren.length,
    ),
    newChildren.length ? t.jsxClosingElement(component) : null,
    newChildren,
    !newChildren.length,
  );
  jsxElement.replaceWith(newElement);
}

function replaceNodePath(
  expressionPath: NodePath<Types.Expression>,
  namePath: NodePath<Types.JSXIdentifier | Types.Identifier>,
  importName: string,
  t: typeof Types,
  tagNamePath: NodePath<
    Types.JSXIdentifier | Types.Identifier | Types.JSXMemberExpression | Types.MemberExpression
  >,
  sxComponentName: string,
) {
  const sxIdentifier = addNamed(namePath, importName, process.env.PACKAGE_NAME as string);
  let wasSxTransformed = false;

  const wrapWithSxCall = (expPath: NodePath<Types.Expression>) => {
    let tagNameArg: Types.Identifier | Types.MemberExpression | null = null;
    if (tagNamePath.isJSXIdentifier()) {
      tagNameArg = t.identifier(tagNamePath.node.name);
    } else if (tagNamePath.isJSXMemberExpression()) {
      tagNameArg = convertJsxMemberExpressionToMemberExpression(t, tagNamePath);
    } else {
      tagNameArg = tagNamePath.node as Types.Identifier | Types.MemberExpression;
    }
    expPath.replaceWith(t.callExpression(sxIdentifier, [expPath.node, tagNameArg]));
    wasSxTransformed = true;
  };

  sxPropConverter(expressionPath, wrapWithSxCall);

  if (wasSxTransformed) {
    if (tagNamePath.isJSXIdentifier() || tagNamePath.isJSXMemberExpression()) {
      wrapWithSxComponent(t, tagNamePath, sxComponentName);
    }
  }
}

export const babelPlugin = declare<{
  propName?: string;
  importName?: string;
  sxComponentName?: string;
}>((api, { propName = 'sx', importName = 'sx', sxComponentName = 'ForwardSx' }) => {
  api.assertVersion(7);
  const { types: t } = api;
  return {
    name: '@pigmentcss/sx-plugin',
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
        const valuePath = path.get('value');
        if (!valuePath.isJSXExpressionContainer()) {
          return;
        }
        const expressionPath = valuePath.get('expression');
        if (!expressionPath.isExpression()) {
          return;
        }
        // @ts-ignore
        replaceNodePath(expressionPath, namePath, importName, t, tagName, sxComponentName);
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
        replaceNodePath(valuePath, keyPath, importName, t, jsxElement, sxComponentName);
      },
    },
  };
});
