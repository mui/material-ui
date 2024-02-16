import { serializeStyles } from '@emotion/serialize';

type BaseTheme = {
  vars?: Record<string, string>;
  cssVarPrefix: string;
  colorSchemes: Record<string, unknown>;
  generateCssVars: (colorScheme?: string) => { css: Record<string, string> };
};

export function generateTokenCss(theme: BaseTheme) {
  // create stylesheet as object
  const stylesheetObj: Record<string, Record<string, string>> = {
    ':root': theme.generateCssVars().css,
  };
  Object.entries(theme.colorSchemes).forEach(([key]) => {
    stylesheetObj[
      `${key === 'light' ? ':root, ' : ''}[data-${theme.cssVarPrefix}-color-scheme="${key}"]`
    ] = theme.generateCssVars(key).css;
  });

  // use emotion to serialize the object to css string
  const { styles } = serializeStyles([stylesheetObj]);
  return styles;
}

export function generateThemeTokens(theme: BaseTheme) {
  if (!theme || typeof theme !== 'object') {
    return {};
  }
  // is created using extendTheme
  if ('vars' in theme && theme.vars) {
    return {
      vars: theme.vars,
    };
  }
  return {};
}
