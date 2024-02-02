import { serializeStyles } from '@emotion/serialize';
import { Theme } from '../extendTheme';

export function generateTokenCss(theme: Theme) {
  // create stylesheet as object
  const rootCss = theme.generateCssVars().css;
  const stylesheetObj: Record<string, Record<string, any>> = {};
  if (Object.keys(rootCss).length) {
    stylesheetObj[':root'] = rootCss;
  }
  Object.entries(theme.colorSchemes || {}).forEach(([key]) => {
    const css = theme.generateCssVars(key).css;
    if (Object.keys(css).length) {
      if (theme.prefersColorScheme) {
        if (theme.defaultColorScheme === key) {
          stylesheetObj[':root'] = css;
        }
        if (theme.prefersColorScheme.light === key) {
          stylesheetObj['@media (prefers-color-scheme: light)'] = {
            ':root': css,
          };
        }
        if (theme.prefersColorScheme.dark === key) {
          stylesheetObj['@media (prefers-color-scheme: dark)'] = {
            ':root': css,
          };
        }
      }
      if (theme.getColorSchemeSelector) {
        if (theme.defaultColorScheme === key) {
          stylesheetObj[`:root, ${theme.getColorSchemeSelector(key)}`] = css;
        } else {
          stylesheetObj[theme.getColorSchemeSelector(key)] = css;
        }
      }
    }
  });

  // use emotion to serialize the object to css string
  const { styles } = serializeStyles([stylesheetObj]);
  console.log('styles', styles);
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
