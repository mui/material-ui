import prepareCssVars, { DefaultCssVarsTheme } from './prepareCssVars';
import { DEFAULT_ATTRIBUTE } from '../InitColorSchemeScript/InitColorSchemeScript';

interface Theme extends DefaultCssVarsTheme {
  cssVarPrefix?: string;
  cssRule?: 'media' | string;
  shouldSkipGeneratingVar?: (objectPathKeys: Array<string>, value: string | number) => boolean;
}

function createCssVarsTheme<T extends Theme, ThemeVars extends Record<string, any>>({
  cssRule = `[${DEFAULT_ATTRIBUTE}="%s"]`,
  ...theme
}: T) {
  const output: any = theme;
  const result = prepareCssVars<Omit<T, 'shouldSkipGeneratingVar' | 'cssVarPrefix'>, ThemeVars>(
    output,
    {
      ...theme,
      prefix: theme.cssVarPrefix,
      cssRule,
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
