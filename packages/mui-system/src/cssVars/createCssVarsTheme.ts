import prepareCssVars, { DefaultCssVarsTheme } from './prepareCssVars';
import { createGetColorSchemeSelector } from './getColorSchemeSelector';
import { DEFAULT_ATTRIBUTE } from '../InitColorSchemeScript/InitColorSchemeScript';

interface Theme extends DefaultCssVarsTheme {
  cssVarPrefix?: string;
  colorSchemeSelector?: 'media' | string;
  shouldSkipGeneratingVar?: (objectPathKeys: Array<string>, value: string | number) => boolean;
}

function createCssVarsTheme<T extends Theme, ThemeVars extends Record<string, any>>({
  colorSchemeSelector = `[${DEFAULT_ATTRIBUTE}="%s"]`,
  ...theme
}: T) {
  const output: any = theme;
  const result = prepareCssVars<Omit<T, 'shouldSkipGeneratingVar' | 'cssVarPrefix'>, ThemeVars>(
    output,
    {
      ...theme,
      prefix: theme.cssVarPrefix,
      colorSchemeSelector,
    },
  );
  output.vars = result.vars;
  output.generateThemeVars = result.generateThemeVars;
  output.generateStyleSheets = result.generateStyleSheets;
  output.colorSchemeSelector = colorSchemeSelector;
  output.getColorSchemeSelector = createGetColorSchemeSelector(colorSchemeSelector);

  return output as T & typeof result;
}

export default createCssVarsTheme;
