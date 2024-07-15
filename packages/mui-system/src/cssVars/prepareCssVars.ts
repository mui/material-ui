import deepmerge from '@mui/utils/deepmerge';
import cssVarsParser from './cssVarsParser';

export interface DefaultCssVarsTheme {
  attribute?: string;
  colorSchemes?: Record<string, any>;
  defaultColorScheme?: string;
}

function prepareCssVars<T extends DefaultCssVarsTheme, ThemeVars extends Record<string, any>>(
  theme: T,
  {
    getSelector,
    ...parserConfig
  }: {
    prefix?: string;
    shouldSkipGeneratingVar?: (objectPathKeys: Array<string>, value: string | number) => boolean;
    getSelector?: (
      colorScheme: keyof T['colorSchemes'] | undefined,
      css: Record<string, any>,
    ) => string | Record<string, any>;
  } = {},
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
  const { [defaultColorScheme]: defaultScheme, ...otherColorSchemes } = colorSchemes;
  Object.entries(otherColorSchemes || {}).forEach(([key, scheme]) => {
    const { vars, css, varsWithDefaults } = cssVarsParser<ThemeVars>(scheme, parserConfig);
    themeVars = deepmerge(themeVars, varsWithDefaults);
    colorSchemesMap[key] = { css, vars };
  });
  if (defaultScheme) {
    // default color scheme vars should be merged last to set as default
    const { css, vars, varsWithDefaults } = cssVarsParser<ThemeVars>(defaultScheme, parserConfig);
    themeVars = deepmerge(themeVars, varsWithDefaults);
    colorSchemesMap[defaultColorScheme] = { css, vars };
  }

  const generateThemeVars = () => {
    let vars = { ...rootVars };
    Object.entries(colorSchemesMap).forEach(([, { vars: schemeVars }]) => {
      vars = deepmerge(vars, schemeVars);
    });
    return vars;
  };

  const generateStyleSheets = () => {
    const stylesheets: Array<Record<string, any>> = [];
    const colorScheme = theme.defaultColorScheme || 'light';
    function insertStyleSheet(selector: string | object, css: Record<string, string | number>) {
      if (Object.keys(css).length) {
        stylesheets.push(typeof selector === 'string' ? { [selector]: { ...css } } : selector);
      }
    }
    insertStyleSheet(getSelector?.(undefined, { ...rootCss }) || ':root', rootCss);

    const { [colorScheme]: defaultSchemeVal, ...other } = colorSchemesMap;

    if (defaultSchemeVal) {
      // default color scheme has to come before other color schemes
      const { css } = defaultSchemeVal;
      insertStyleSheet(
        getSelector?.(colorScheme as keyof T['colorSchemes'], { ...css }) ||
          `[${theme.attribute || 'data-color-scheme'}="${colorScheme}"]`,
        css,
      );
    }

    Object.entries(other).forEach(([key, { css }]) => {
      insertStyleSheet(
        getSelector?.(key as keyof T['colorSchemes'], { ...css }) ||
          `[${theme.attribute || 'data-color-scheme'}="${key}"]`,
        css,
      );
    });

    return stylesheets;
  };

  return {
    vars: themeVars,
    generateThemeVars,
    generateStyleSheets,
  };
}

export default prepareCssVars;
