import type { ExpressionValue } from '@linaria/utils';
import { type ParseResult, parseExpression } from '@babel/parser';
import type { Expression } from '@linaria/tags';
import isUnitLess from './isUnitLess';

interface StyleObj {
  [key: string]: string | number | Function | StyleObj;
}

function iterateAndReplaceFunctions(
  styleObj: unknown,
  expressionValue: ExpressionValue | null,
  getVariableName: (cssKey: string, source: string, hasUnit: boolean) => string,
  acc: [string, ParseResult<Expression>, boolean][],
) {
  const css = styleObj as StyleObj;
  Object.keys(css).forEach((key) => {
    const value = css[key];

    if (typeof value === 'object') {
      if (!Array.isArray(value)) {
        iterateAndReplaceFunctions(value, expressionValue, getVariableName, acc);
      }
      return;
    }

    if (typeof value !== 'function') {
      return;
    }
    try {
      const fnString = value.toString();
      const expression = parseExpression(fnString);
      const unitLess = isUnitLess(key);
      const variableId = getVariableName(key, fnString, unitLess);
      acc.push([variableId, expression, unitLess]);
      css[key] = `var(--${variableId})`;
    } catch (ex) {
      const err = expressionValue?.buildCodeFrameError('Could not parse function expression.');
      if (!err) {
        throw ex;
      }
      if ('cause' in err) {
        err.cause = ex;
      }
      throw err;
    }
  });
}

/**
 * Goes through the css object and identifies any keys where the value is a function and replaces the function with a variable id.
 */
export default function cssFnValueToVariable(
  styleObj: unknown,
  expressionValue: ExpressionValue | null,
  getVariableName: (cssKey: string, source: string, hasUnit: boolean) => string,
) {
  const acc: [string, ParseResult<Expression>, boolean][] = [];
  iterateAndReplaceFunctions(styleObj, expressionValue, getVariableName, acc);
  return acc;
}
