import prepareCssVars, { DefaultCssVarsTheme } from './prepareCssVars';

interface Theme extends DefaultCssVarsTheme {
  cssVarPrefix?: string;
  shouldSkipGeneratingVar?: (objectPathKeys: Array<string>, value: string | number) => boolean;
}

function createCssVarsTheme<T extends Theme, ThemeVars extends Record<string, any>>(theme: T) {
  const { cssVarPrefix, shouldSkipGeneratingVar, ...otherTheme } = theme;

  return {
    ...theme,
    ...prepareCssVars<Omit<T, 'shouldSkipGeneratingVar' | 'cssVarPrefix'>, ThemeVars>(otherTheme, {
      prefix: cssVarPrefix,
      shouldSkipGeneratingVar,
    }),
  };
}

export default createCssVarsTheme;
