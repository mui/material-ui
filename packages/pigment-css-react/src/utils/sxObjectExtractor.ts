import type { NodePath } from '@babel/core';
import { arrowFunctionExpression, cloneNode } from '@babel/types';
import type {
  ArrowFunctionExpression,
  Expression,
  Identifier,
  ObjectExpression,
  PrivateName,
} from '@babel/types';
import { findIdentifiers } from '@wyw-in-js/transform';
import { isStaticObjectOrArrayExpression } from './checkStaticObjectOrArray';

function validateObjectKey(
  keyPath: NodePath<PrivateName | Expression>,
  parentCall?: NodePath<ArrowFunctionExpression>,
) {
  const rootScope = keyPath.scope.getProgramParent();
  if (keyPath.isIdentifier()) {
    return;
  }
  const identifiers = findIdentifiers([keyPath]);
  if (!identifiers.length) {
    return;
  }

  // check if all the identifiers being used for the key, if it is not a static value,
  // (ie, [theme.apply()] or [globalVariable]) are globally defined or not.
  // Global means in the root scope (file scope) or in the same scope as the parentCall
  const areAllGlobalIdentifiers = identifiers.every((item) => {
    // get the definition AST node path of the identifier
    const binding = item.scope.getBinding(item.node.name);
    if (!binding) {
      return false;
    }
    if (
      // if the identifier is defined in the same scope as the parentCall, ie, ({theme}) => ({color: theme.color})
      binding.path.findParent((parent) => parent === parentCall) ||
      // if the identifier is defined in the file scope
      binding.path.scope === rootScope
    ) {
      return true;
    }
    return false;
  });

  if (!parentCall) {
    if (areAllGlobalIdentifiers) {
      return;
    }
    throw keyPath.buildCodeFrameError(
      `${process.env.PACKAGE_NAME}: Expressions in css object keys are not supported.`,
    );
  }
  if (!areAllGlobalIdentifiers) {
    throw keyPath.buildCodeFrameError(
      `${process.env.PACKAGE_NAME}: Variables in css object keys should only use the passed theme(s) object or variables that are defined in the root scope.`,
    );
  }
}

function traverseObjectExpression(
  nodePath: NodePath<ObjectExpression>,
  parentCall?: NodePath<ArrowFunctionExpression>,
) {
  const rootScope = nodePath.scope.getProgramParent();
  const properties = nodePath.get('properties');
  properties.forEach((property) => {
    if (property.isObjectProperty()) {
      validateObjectKey(property.get('key'), parentCall);

      const value = property.get('value');
      if (!value.isExpression()) {
        throw value.buildCodeFrameError(
          `${process.env.PACKAGE_NAME}: This value is not supported. It can only be static values or local variables.`,
        );
      }
      if (value.isObjectExpression()) {
        traverseObjectExpression(value, parentCall);
      } else if (!value.isLiteral() && !isStaticObjectOrArrayExpression(value)) {
        const identifiers = findIdentifiers([value], 'reference');
        const localIdentifiers: NodePath<Identifier>[] = [];
        identifiers.forEach((id) => {
          if (!id.isIdentifier()) {
            return;
          }
          const binding = id.scope.getBinding(id.node.name);
          if (!binding) {
            return;
          }
          if ((parentCall && binding.scope === parentCall.scope) || binding.scope === rootScope) {
            return;
          }
          localIdentifiers.push(id);
        });
        if (localIdentifiers.length) {
          const arrowFn = arrowFunctionExpression(
            localIdentifiers.map((i) => i.node),
            cloneNode(value.node),
          );
          value.replaceWith(arrowFn);
        }
      }
    } else if (property.isSpreadElement()) {
      const identifiers = findIdentifiers([property.get('argument')]);
      if (
        !identifiers.every((id) => {
          const binding = property.scope.getBinding(id.node.name);
          // the indentifier definition should either be in the root scope or in the same scope
          // as the object property, ie, ({theme}) => ({...theme.applyStyles()})
          return binding && (binding.scope === rootScope || binding.scope === property.scope);
        })
      ) {
        throw property.buildCodeFrameError(
          `${process.env.PACKAGE_NAME}: You can only use variables in the spread that are defined in the root scope of the file.`,
        );
      }
    } else if (property.isObjectMethod()) {
      throw property.buildCodeFrameError(
        `${process.env.PACKAGE_NAME}: sx prop object does not support ObjectMethods.`,
      );
    } else {
      throw property.buildCodeFrameError(
        `${process.env.PACKAGE_NAME}: Unknown property in object.`,
      );
    }
  });
}

export function sxObjectExtractor(nodePath: NodePath<ObjectExpression | ArrowFunctionExpression>) {
  if (nodePath.isObjectExpression()) {
    traverseObjectExpression(nodePath);
  } else if (nodePath.isArrowFunctionExpression()) {
    const body = nodePath.get('body');
    if (!body.isObjectExpression()) {
      throw body.buildCodeFrameError(
        `${process.env.PACKAGE_NAME}: sx prop only supports arrow functions directly returning an object, for example () => ({color: 'red'}). You can accept theme object in the params if required.`,
      );
    }
    traverseObjectExpression(body, nodePath);
  }
}
