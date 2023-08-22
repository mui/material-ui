import type { ExpressionValue } from '@linaria/utils';
import { transformSync, type Node } from '@babel/core';
import { parseExpression } from '@babel/parser';
import type { Expression } from '@linaria/tags';
import type { Theme } from '@mui/material/styles';
import { unstable_defaultSxConfig as defaultSxConfig } from '@mui/system/styleFunctionSx';
import { isUnitLess } from './isUnitLess';
import { cssFunctionTransformerPlugin } from './cssFunctionTransformerPlugin';

interface StyleObj {
  [key: string]: string | number | Function | StyleObj;
}

export type PluginCustomOptions = {
  /**
   * To generate css variables like this `--{cssVariablesPrefix}-palette-primary-main`
   */
  cssVariablesPrefix?: string;
  /**
   * Object to pass as parameter to the styled css callback functions.
   */
  themeArgs?: {
    theme: Theme;
  };
};

type CssFnValueToVariableParams = {
  styleObj: unknown;
  expressionValue: ExpressionValue | null;
  getVariableName: (cssKey: string, source: string, hasUnit: boolean) => string;
  filename?: string | null;
  options: PluginCustomOptions;
};

function transformThemeKeysInFn(
  styleKey: string,
  functionString: string,
  options: PluginCustomOptions,
  filename?: string,
) {
  const { themeArgs: { theme } = {} } = options;
  const config = theme?.unstable_sxConfig ?? defaultSxConfig;
  const cssPropOptions = config[styleKey];
  const { themeKey } = cssPropOptions;

  // return the function as-is if sxConfig does not contain
  // this css key
  if (!theme || !config || !cssPropOptions || !themeKey) {
    return parseExpression(functionString);
  }

  const result = transformSync(functionString, {
    plugins: [
      [
        cssFunctionTransformerPlugin,
        {
          styleKey,
          options,
        },
      ],
    ],
    filename: filename ?? 'intermediate-fn.ts',
    ast: true,
    configFile: false,
    babelrc: false,
  });
  const firstItem = result?.ast?.program.body[0];
  if (!firstItem) {
    return parseExpression(functionString);
  }
  if (firstItem.type === 'ExpressionStatement') {
    return firstItem.expression;
  }
  return parseExpression(functionString);
}

function iterateAndReplaceFunctions(
  styleObj: unknown,
  expressionValue: ExpressionValue | null,
  getVariableName: (cssKey: string, source: string, hasUnit: boolean) => string,
  options: PluginCustomOptions,
  acc: [string, Node, boolean][],
  filename?: string,
) {
  const css = styleObj as StyleObj;
  Object.keys(css).forEach((key) => {
    const value = css[key];

    if (typeof value === 'object') {
      if (!Array.isArray(value)) {
        iterateAndReplaceFunctions(value, expressionValue, getVariableName, options, acc, filename);
      }
      return;
    }

    if (typeof value !== 'function') {
      return;
    }

    try {
      const fnString = value.toString();
      const expression = transformThemeKeysInFn(key, fnString, options, filename);
      const unitLess = isUnitLess(key);
      const variableId = getVariableName(key, fnString, unitLess);
      acc.push([variableId, expression, unitLess]);
      css[key] = `var(--${variableId})`;
    } catch (ex) {
      const err = expressionValue?.buildCodeFrameError(
        (ex as Error).message || 'Could not parse function expression.',
      );
      if (!err) {
        throw ex;
      }
      err.cause = ex;
      throw err;
    }
  });
}

/**
 * Goes through the css object and identifies any keys where the value is a function and replaces the function with a variable id.
 */
export function cssFnValueToVariable({
  styleObj,
  expressionValue,
  getVariableName,
  filename,
  options,
}: CssFnValueToVariableParams) {
  const acc: [string, Expression, boolean][] = [];
  iterateAndReplaceFunctions(
    styleObj,
    expressionValue,
    getVariableName,
    options,
    acc,
    filename ?? undefined,
  );
  return acc;
}
