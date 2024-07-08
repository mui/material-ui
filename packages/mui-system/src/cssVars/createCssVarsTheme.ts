import prepareCssVars, { DefaultCssVarsTheme } from './prepareCssVars';
import { DEFAULT_ATTRIBUTE } from '../InitColorSchemeScript/InitColorSchemeScript';

interface Theme extends DefaultCssVarsTheme {
  cssVarPrefix?: string;
  cssRule?: 'media' | string;
  shouldSkipGeneratingVar?: (objectPathKeys: Array<string>, value: string | number) => boolean;
}

function createCssVarsTheme<T extends Theme, ThemeVars extends Record<string, any>>(theme: T) {
  const output: any = theme;
  const cssRule = theme.cssRule || `[${DEFAULT_ATTRIBUTE}="%s"]`;
  const result = prepareCssVars<Omit<T, 'shouldSkipGeneratingVar' | 'cssVarPrefix'>, ThemeVars>(
    output,
    {
      ...theme,
      prefix: theme.cssVarPrefix,
      getSelector: (colorScheme) => {
        let rule = cssRule;
        if (cssRule?.startsWith('data-') && !cssRule.includes('%s')) {
          // 'data-joy-color-scheme' -> '[data-joy-color-scheme="%s"]'
          rule = `[${cssRule}="%s"]`;
        }
        if (colorScheme) {
          if (rule === 'media') {
            if (theme.defaultColorScheme === colorScheme) {
              return ':root';
            }
            return `@media (prefers-color-scheme: ${String(colorScheme)}) { :root`;
          }
          if (rule) {
            return rule.replace('%s', String(colorScheme));
          }
        }
        return ':root';
      },
    },
  );
  output.vars = result.vars;
  output.generateThemeVars = result.generateThemeVars;
  output.generateStyleSheets = result.generateStyleSheets;
  output.cssRule = cssRule;
  output.getColorSchemeSelector = (colorScheme: string) => {
    if (cssRule === 'media') {
      return `@media (prefers-color-scheme: ${colorScheme})`;
    }
    if (cssRule) {
      return `${cssRule.replace('%s', colorScheme)} &`;
    }
    return '&';
  };

  return output as T & typeof result;
}

export default createCssVarsTheme;
