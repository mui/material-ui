import { deepmerge } from '@mui/utils';
import cssVarsParser from './cssVarsParser';

export interface DefaultCssVarsTheme {
  colorSchemes?: Record<string, any>;
  defaultColorScheme?: string;
}

function prepareCssVars<T extends DefaultCssVarsTheme, ThemeVars extends Record<string, any>>(
  theme: T,
  parserConfig?: {
    prefix?: string;
    shouldSkipGeneratingVar?: (objectPathKeys: Array<string>, value: string | number) => boolean;
  },
) {
  // @ts-ignore - ignore components do not exist
  const { colorSchemes = {}, components, defaultColorScheme = 'light', ...otherTheme } = theme;
  const {
    vars: rootVars,
    css: rootCss,
    varsWithDefaults: rootVarsWithDefaults,
  } = cssVarsParser<ThemeVars>(otherTheme, parserConfig);
  let themeVars = rootVarsWithDefaults as unknown as ThemeVars;

  const colorSchemesMap: Record<string, { css: Record<string, string | number>; vars: ThemeVars }> =
    {};
  const { [defaultColorScheme]: light, ...otherColorSchemes } = colorSchemes;
  Object.entries(otherColorSchemes || {}).forEach(([key, scheme]) => {
    const { vars, css, varsWithDefaults } = cssVarsParser<ThemeVars>(scheme, parserConfig);
    themeVars = deepmerge(themeVars, varsWithDefaults);
    colorSchemesMap[key] = { css, vars };
  });
  if (light) {
    // default color scheme vars should be merged last to set as default
    const { css, vars, varsWithDefaults } = cssVarsParser<ThemeVars>(light, parserConfig);
    themeVars = deepmerge(themeVars, varsWithDefaults);
    colorSchemesMap[defaultColorScheme] = { css, vars };
  }

  const generateCssVars = (colorScheme?: string) => {
    if (!colorScheme) {
      return { css: { ...rootCss }, vars: rootVars };
    }
    return {
      css: { ...colorSchemesMap[colorScheme].css },
      vars: colorSchemesMap[colorScheme].vars,
    };
  };

  return {
    vars: themeVars,
    generateCssVars,
  };
}

export default prepareCssVars;
