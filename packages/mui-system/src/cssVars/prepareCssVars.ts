import deepmerge from '@mui/utils/deepmerge';
import cssVarsParser from './cssVarsParser';

export interface DefaultCssVarsTheme {
  colorSchemes?: Record<string, any>;
  defaultColorScheme?: string;
}

function prepareCssVars<
  T extends DefaultCssVarsTheme,
  ThemeVars extends Record<string, any>,
  Selector = string | object,
>(
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
    ) => Selector;
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
      const css = { ...rootCss };
      return {
        css,
        vars: rootVars,
        selector: getSelector?.(colorScheme as keyof T['colorSchemes'], css) || ':root',
      };
    }
    const css = { ...colorSchemesMap[colorScheme as string].css };
    return {
      css,
      vars: colorSchemesMap[colorScheme as string].vars,
      selector: getSelector?.(colorScheme as keyof T['colorSchemes'], css) || ':root',
    };
  };

  const generateStyleSheets = () => {
    const stylesheets: Array<Record<string, any>> = [];
    const colorScheme = theme.defaultColorScheme || 'light';
    function insertStyleSheet(selector: string | object, css: Record<string, string | number>) {
      if (Object.keys(css).length) {
        stylesheets.push(typeof selector === 'string' ? { [selector]: { ...css } } : selector);
      }
    }
    insertStyleSheet(getSelector?.(undefined, rootCss) || ':root', rootCss);

    const { [colorScheme]: defaultScheme, ...rest } = colorSchemesMap;

    if (defaultScheme) {
      // default color scheme has to come before other color schemes
      const { css } = defaultScheme;
      insertStyleSheet(
        getSelector?.(colorScheme as keyof T['colorSchemes'], css) || `.${String(colorScheme)}`,
        css,
      );
    }

    Object.entries(rest).forEach(([key, { css }]) => {
      insertStyleSheet(getSelector?.(key as keyof T['colorSchemes'], css) || `.${key}`, css);
    });

    return stylesheets;
  };

  return {
    vars: themeVars,
    generateCssVars,
    generateStyleSheets,
  };
}

export default prepareCssVars;
