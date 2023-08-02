import type { ExpressionValue } from '@linaria/utils';
import { type ParseResult, parseExpression } from '@babel/parser';
import type { Expression } from '@linaria/tags';
import unitLessKeys from '@emotion/unitless';

interface StyleObj {
  [key: string]: string | number | Function | StyleObj;
}

function isUnitLess(key: string) {
  return key in unitLessKeys && unitLessKeys[key] === 1;
}

function iterate(
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
        iterate(value, expressionValue, getVariableName, acc);
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
      acc.push([variableId, expression, isUnitLess(key)]);
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

export default function cssFnValueToVariable(
  styleObj: unknown,
  expressionValue: ExpressionValue | null,
  getVariableName: (cssKey: string, source: string, hasUnit: boolean) => string,
) {
  const acc: [string, ParseResult<Expression>, boolean][] = [];
  iterate(styleObj, expressionValue, getVariableName, acc);
  return acc;
}
