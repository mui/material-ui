import type { types as t } from '@babel/core';
import { type ExpressionValue, isSerializable } from '@linaria/utils';

/**
 * Converts a javascript primitive to its Babel AST node representation.
 */
export function valueToLiteral(value: unknown, expression?: ExpressionValue): t.Expression {
  if (value === undefined) {
    return {
      type: 'Identifier',
      name: 'undefined',
    };
  }

  if (isSerializable(value)) {
    if (value === null) {
      return {
        type: 'NullLiteral',
      };
    }

    if (typeof value === 'string') {
      return {
        type: 'StringLiteral',
        value,
      };
    }

    if (typeof value === 'number') {
      return {
        type: 'NumericLiteral',
        value,
      };
    }

    if (typeof value === 'boolean') {
      return {
        type: 'BooleanLiteral',
        value,
      };
    }

    if (Array.isArray(value)) {
      return {
        type: 'ArrayExpression',
        elements: value.map((v) => valueToLiteral(v, expression)),
      };
    }

    return {
      type: 'ObjectExpression',
      properties: Object.entries(value).map(([key, v]) => ({
        type: 'ObjectProperty',
        key: key.match(/^[a-zA-Z]\w*$/)
          ? {
              type: 'Identifier',
              name: key,
            }
          : {
              type: 'StringLiteral',
              value: key,
            },
        value: valueToLiteral(v, expression),
        computed: false,
        shorthand: false,
      })),
    };
  }

  throw (
    expression?.buildCodeFrameError(
      `The expression evaluated to '${value}', which is probably a mistake. If you want it to be inserted into CSS, explicitly cast or transform the value to a string, e.g. - 'String(${expression.source})'.`,
    ) ?? new Error('Could not convert value to literal.')
  );
}
