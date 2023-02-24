import prepareCssVars, { DefaultCssVarsTheme } from './prepareCssVars';

interface Theme extends DefaultCssVarsTheme {
  cssVarPrefix?: string;
  shouldSkipGeneratingVar?: (objectPathKeys: Array<string>, value: string | number) => boolean;
}

function createCssVarsTheme<T extends Theme, ThemeVars>(theme: T) {
  const { colorSchemes, cssVarPrefix, shouldSkipGeneratingVar, ...otherTheme } = theme;

  return {
    ...theme,
    ...prepareCssVars<T, ThemeVars>(
      { colorSchemes, ...otherTheme },
      {
        prefix: cssVarPrefix,
        shouldSkipGeneratingVar,
      },
    ),
  };
}

export default createCssVarsTheme;
