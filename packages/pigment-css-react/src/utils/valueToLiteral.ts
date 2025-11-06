import { types as t } from '@babel/core';
import { parseExpression } from '@babel/parser';
import { ExpressionValue, isBoxedPrimitive } from '@wyw-in-js/shared';
import { Serializable } from '@wyw-in-js/transform';

export function isSerializable(o: unknown): o is Serializable {
  if (Array.isArray(o)) {
    return o.every(isSerializable);
  }

  if (o === null) {
    return true;
  }

  if (isBoxedPrimitive(o)) {
    return true;
  }

  if (typeof o === 'object') {
    return Object.values(o).every(isSerializable);
  }

  return (
    typeof o === 'function' ||
    typeof o === 'string' ||
    typeof o === 'number' ||
    typeof o === 'boolean'
  );
}

export function parseAndGenerateFunction(fnString: string, expression?: ExpressionValue) {
  try {
    const exp = parseExpression(fnString);
    // a function or an arrow function expression
    return exp as t.FunctionExpression | t.ArrowFunctionExpression;
  } catch (ex) {
    try {
      const exp = parseExpression(`{${fnString}}`);
      if (exp.type !== 'ObjectExpression') {
        throw new Error('MUI: The expression must be an object literal.');
      }
      const propMethod = exp.properties[0] as t.ObjectMethod;
      return t.arrowFunctionExpression(propMethod.params, propMethod.body);
    } catch (ex2) {
      throw (
        expression?.buildCodeFrameError(`MUI: Could not parse the expression '${fnString}'.`) ??
        new Error(`MUI: Could not parse the given expression ${fnString}`)
      );
    }
  }
}

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

  if (typeof value === 'function') {
    return parseAndGenerateFunction(value.toString(), expression);
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
      `The expression evaluated to '${value}', which is probably a mistake. If you want it to be inserted into CSS, explicitly cast or transform the value to a string, for example - 'String(${expression.source})'.`,
    ) ?? new Error(`Could not convert value: "${value}" to literal.`)
  );
}
