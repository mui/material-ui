import { serializeStyles } from '@emotion/serialize';

type BaseTheme = {
  cssVarPrefix: string;
  colorSchemes: Record<string, unknown>;
  generateCssVars: (colorScheme?: string) => { css: Record<string, string> };
};

export function generateThemeTokens(theme: BaseTheme) {
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
