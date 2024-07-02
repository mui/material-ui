import prepareCssVars, { DefaultCssVarsTheme } from './prepareCssVars';
import { DEFAULT_ATTRIBUTE } from '../InitColorSchemeScript/InitColorSchemeScript';

interface Theme extends DefaultCssVarsTheme {
  cssVarPrefix?: string;
  strategy?: 'media' | string;
  shouldSkipGeneratingVar?: (objectPathKeys: Array<string>, value: string | number) => boolean;
}

function createCssVarsTheme<T extends Theme, ThemeVars extends Record<string, any>>(theme: T) {
  const output: any = theme;
  const result = prepareCssVars<Omit<T, 'shouldSkipGeneratingVar' | 'cssVarPrefix'>, ThemeVars>(
    output,
    {
      ...theme,
      prefix: theme.cssVarPrefix,
    },
  );
  output.vars = result.vars;
  output.generateThemeVars = result.generateThemeVars;
  output.generateStyleSheets = result.generateStyleSheets;

  const strategy = theme.strategy || `[${DEFAULT_ATTRIBUTE}="%s"]`;
  output.strategy = strategy;
  output.getColorSchemeSelector = (colorScheme: string) => {
    if (strategy === 'media') {
      return `@media (prefers-color-scheme: ${colorScheme})`;
    }
    if (strategy) {
      return strategy.replace('%s', colorScheme);
    }
    return '&';
  };

  return output as T & typeof result;
}

export default createCssVarsTheme;
