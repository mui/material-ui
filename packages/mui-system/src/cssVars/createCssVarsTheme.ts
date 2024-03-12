import prepareCssVars, { DefaultCssVarsTheme } from './prepareCssVars';

interface Theme extends DefaultCssVarsTheme {
  cssVarPrefix?: string;
  shouldSkipGeneratingVar?: (objectPathKeys: Array<string>, value: string | number) => boolean;
}

function createCssVarsTheme<T extends Theme, ThemeVars extends Record<string, any>>(theme: T) {
  const { cssVarPrefix, shouldSkipGeneratingVar, ...otherTheme } = theme;

  const output: any = otherTheme;
  const result = prepareCssVars<Omit<T, 'shouldSkipGeneratingVar' | 'cssVarPrefix'>, ThemeVars>(
    output,
    {
      prefix: cssVarPrefix,
      shouldSkipGeneratingVar,
    },
  );
  output.vars = result.vars;
  output.generateThemeVars = result.generateThemeVars;
  output.generateStyleSheets = result.generateStyleSheets;

  return output as T & typeof result;
}

export default createCssVarsTheme;
