import { serializeStyles } from '@emotion/serialize';
import { Theme } from './extendTheme';

export function generateTokenCss(theme: Theme) {
  // create stylesheet as object
  const { css: rootCss, selector: rootSelector } = theme.generateCssVars();
  const stylesheets: Array<Record<string, any>> = [];
  if (Object.keys(rootCss).length) {
    stylesheets.push(typeof rootSelector === 'string' ? { [rootSelector]: rootCss } : rootSelector);
  }
  if (theme.colorSchemes) {
    const { [theme.defaultColorScheme!]: defaultScheme, ...otherColorSchemes } = theme.colorSchemes;

    if (defaultScheme) {
      // need to generate default color scheme first for the prefers-color-scheme media query to work
      // because media-queries does not increase specificity
      const { css, selector } = theme.generateCssVars(theme.defaultColorScheme);
      if (Object.keys(css).length) {
        stylesheets.push(typeof selector === 'string' ? { [selector]: css } : selector);
      }
    }

    Object.entries(otherColorSchemes).forEach(([key]) => {
      const { css, selector } = theme.generateCssVars(key);
      if (Object.keys(css).length) {
        stylesheets.push(typeof selector === 'string' ? { [selector]: css } : selector);
      }
    });
  }

  // use emotion to serialize the object to css string
  const { styles } = serializeStyles(stylesheets);
  return styles;
}

export function generateThemeTokens(theme: Theme) {
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
