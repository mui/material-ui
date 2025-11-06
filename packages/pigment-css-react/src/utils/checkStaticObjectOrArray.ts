import type { NodePath } from '@babel/core';
import type * as t from '@babel/types';

export function isStaticObjectExpression(
  nodePath: NodePath<t.ObjectExpression>,
): nodePath is NodePath<t.ObjectExpression> {
  const properties = nodePath.get('properties');
  return properties.every((property): boolean => {
    if (!property.isObjectProperty()) {
      return false;
    }
    const key = property.get('key');
    const value = property.get('value');
    return (
      (key.isIdentifier() && value.isLiteral()) ||
      (value.isObjectExpression() && isStaticObjectExpression(value))
    );
  });
}

/**
 * Recursively check if all items in an array or all keys and values in
 * an object are static.
 */
export function isStaticObjectOrArrayExpression(
  nodePath: NodePath<t.Expression>,
): nodePath is NodePath<t.ArrayExpression> | NodePath<t.ObjectExpression> {
  if (nodePath.isArrayExpression()) {
    const elements = nodePath.get('elements');
    return elements.every((item) => {
      if (item.isLiteral()) {
        return true;
      }
      if (item.isObjectExpression()) {
        return isStaticObjectExpression(item);
      }
      if (item.isArrayExpression()) {
        return isStaticObjectOrArrayExpression(nodePath);
      }
      return false;
    });
  }
  if (nodePath.isObjectExpression()) {
    return isStaticObjectExpression(nodePath);
  }
  return false;
}
