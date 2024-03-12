import prepareCssVars, { DefaultCssVarsTheme } from './prepareCssVars';

interface Theme extends DefaultCssVarsTheme {
  cssVarPrefix?: string;
  shouldSkipGeneratingVar?: (objectPathKeys: Array<string>, value: string | number) => boolean;
}

function createCssVarsTheme<T extends Theme, ThemeVars extends Record<string, any>>(theme: T) {
  const { cssVarPrefix, shouldSkipGeneratingVar, ...otherTheme } = theme;

  const output = otherTheme as typeof theme &
    ReturnType<
      typeof prepareCssVars<Omit<T, 'shouldSkipGeneratingVar' | 'cssVarPrefix'>, ThemeVars>
    >;
  const { vars, generateThemeVars, generateStyleSheets } = prepareCssVars<
    Omit<T, 'shouldSkipGeneratingVar' | 'cssVarPrefix'>,
    ThemeVars
  >(output, {
    prefix: cssVarPrefix,
    shouldSkipGeneratingVar,
  });
  output.vars = vars;
  output.generateThemeVars = generateThemeVars;
  output.generateStyleSheets = generateStyleSheets;

  return output;
}

export default createCssVarsTheme;
