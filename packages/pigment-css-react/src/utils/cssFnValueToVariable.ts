import type { ExpressionValue, FunctionValue } from '@wyw-in-js/shared';
import { transformSync, type Node } from '@babel/core';
import { parseExpression } from '@babel/parser';
import * as t from '@babel/types';
import type { Expression } from '@babel/types';
import { isUnitLess } from './isUnitLess';
import { cssFunctionTransformerPlugin } from './cssFunctionTransformerPlugin';
import type { Theme } from './extendTheme';

interface StyleObj {
  [key: string]: string | number | (() => void) | StyleObj;
}

export type PluginCustomOptions = {
  /**
   * Object to pass as parameter to the styled css callback functions.
   */
  themeArgs?: { theme?: Theme };
  /**
   * Customize the output CSS. Mainly used for RTL support right now.
   */
  css?: {
    /**
     * To denote that whatever default css is being authored pertains to this
     * direction so that when Pigment CSS generates the CSS for the other direction,
     * it can revert the direction of the selector accordingly.
     * @default 'ltr'
     */
    defaultDirection: 'ltr' | 'rtl';
    /**
     * Pass this as true if you want to output the CSS for both ltr and rtl.
     * The css of the non-default direction will be wrapped in a `dir` selector.
     */
    generateForBothDir: boolean;
    /**
     * Pass this callback to customize the selector for the `dir` attribute. The default
     * is [dir=ltr] or [dir=rtl].
     */
    getDirSelector?: (dir: 'ltr' | 'rtl') => string;
  };
};

type CssFnValueToVariableParams = {
  styleObj: unknown;
  expressionValue: ExpressionValue | null;
  getVariableName: (cssKey: string, source: string, hasUnit: boolean) => string;
  filename?: string | null;
  options: PluginCustomOptions;
  includeThemeArg?: boolean;
  themeImportIdentifier?: string;
};

// @TODO - Implement default theme argument for non-theme config as well.
function parseAndWrapExpression(
  functionString: string,
  expressionValue?: FunctionValue,
  themeImportIdentifier?: string,
) {
  if (!expressionValue) {
    return parseExpression(functionString);
  }
  const expression = parseExpression(functionString);
  if (expression.type === 'FunctionExpression' || expression.type === 'ArrowFunctionExpression') {
    // let parsedParentExpression = expressionCache.get(expressionValue);
    // if (!parsedParentExpression) {
    //   parsedParentExpression = parseExpression(expressionValue.source);
    //   if (!parsedParentExpression) {
    //     throw new Error("MUI: Could not parse styled function's source.");
    //   }
    // }
    expression.params.push(
      t.assignmentPattern(t.identifier('theme'), t.identifier(themeImportIdentifier ?? 'theme')),
    );
  }
  return expression;
}

function transformThemeKeysInFn(
  styleKey: string,
  functionString: string,
  options: PluginCustomOptions,
  filename?: string,
  expressionValue?: FunctionValue,
  themeImportIdentifier?: string,
) {
  const { themeArgs: { theme } = {} } = options;

  // return the function as-is if sxConfig does not contain
  // this css key
  if (!theme) {
    return parseAndWrapExpression(functionString, expressionValue, themeImportIdentifier);
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
    return parseAndWrapExpression(functionString, expressionValue, themeImportIdentifier);
  }
  const defaultThemeParam = t.assignmentPattern(
    t.identifier('theme'),
    t.identifier(themeImportIdentifier ?? 'theme'),
  );
  if (firstItem.type === 'ExpressionStatement') {
    const { expression } = firstItem;
    if (expression.type === 'ArrowFunctionExpression' || expression.type === 'FunctionExpression') {
      expression.params.push(defaultThemeParam);
    }
    return expression;
  }
  if (firstItem.type === 'FunctionDeclaration') {
    return t.functionExpression(null, [...firstItem.params, defaultThemeParam], firstItem.body);
  }
  return parseAndWrapExpression(functionString, expressionValue, themeImportIdentifier);
}

function iterateAndReplaceFunctions(
  styleObj: unknown,
  expressionValue: ExpressionValue | null,
  getVariableName: (cssKey: string, source: string, hasUnit: boolean) => string,
  options: PluginCustomOptions,
  acc: [string, Node, boolean][],
  filename?: string,
  themeImportIdentifier?: string,
  includeThemeArg = false,
) {
  const css = styleObj as StyleObj;
  Object.keys(css).forEach((key) => {
    const value = css[key];

    if (typeof value === 'object') {
      if (!Array.isArray(value)) {
        iterateAndReplaceFunctions(
          value,
          expressionValue,
          getVariableName,
          options,
          acc,
          filename,
          themeImportIdentifier,
          includeThemeArg,
        );
      }
      return;
    }

    if (typeof value !== 'function') {
      return;
    }

    try {
      const fnString = value.toString();
      const expression = transformThemeKeysInFn(
        key,
        fnString,
        options,
        filename,
        includeThemeArg && expressionValue ? (expressionValue as FunctionValue) : undefined,
        themeImportIdentifier,
      );
      const unitLess = isUnitLess(key);
      const variableId = getVariableName(key, fnString, unitLess);
      acc.push([variableId, expression, unitLess]);
      css[key] = `var(--${variableId})`;
    } catch (ex) {
      const err = expressionValue?.buildCodeFrameError(
        (ex as Error).message || 'Could not parse function expression.',
      ) as Error;
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
export function cssFnValueToVariable({
  styleObj,
  expressionValue,
  getVariableName,
  filename,
  options,
  themeImportIdentifier,
  includeThemeArg = false,
}: CssFnValueToVariableParams) {
  const acc: [string, Expression, boolean][] = [];
  iterateAndReplaceFunctions(
    styleObj,
    expressionValue,
    getVariableName,
    options,
    acc,
    filename ?? undefined,
    themeImportIdentifier,
    includeThemeArg,
  );
  return acc;
}
