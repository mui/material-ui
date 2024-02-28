import deepmerge from '@mui/utils/deepmerge';
import cssVarsParser from './cssVarsParser';

export interface DefaultCssVarsTheme {
  colorSchemes?: Record<string, any>;
  defaultColorScheme?: string;
}

function prepareCssVars<
  T extends DefaultCssVarsTheme,
  ThemeVars extends Record<string, any>,
  Selector = any,
>(
  theme: T,
  parserConfig?: {
    prefix?: string;
    shouldSkipGeneratingVar?: (objectPathKeys: Array<string>, value: string | number) => boolean;
    getSelector?: (colorScheme: string | undefined, css: Record<string, any>) => Selector;
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
      const css = { ...rootCss };
      return {
        css,
        vars: rootVars,
        selector: parserConfig?.getSelector?.(colorScheme, css) || ':root',
      };
    }
    const css = { ...colorSchemesMap[colorScheme].css };
    return {
      css,
      vars: colorSchemesMap[colorScheme].vars,
      selector: parserConfig?.getSelector?.(colorScheme, css) || ':root',
    };
  };

  const generateStyleSheets = () => {
    const stylesheets = [];
    const rootSelector = parserConfig?.getSelector?.(undefined, rootCss) || ':root';
    if (Object.keys(rootCss).length) {
      stylesheets.push(
        typeof rootSelector === 'string' ? { [rootSelector]: { ...rootCss } } : rootSelector,
      );
    }

    const { [defaultColorScheme]: defaultScheme, ...rest } = colorSchemesMap;

    if (defaultScheme) {
      // default color scheme has to come before other color schemes
      const selector = parserConfig?.getSelector?.(defaultColorScheme, css) || ':root';
      if (Object.keys(defaultScheme.css).length) {
        stylesheets.push(typeof selector === 'string' ? { [selector]: css } : selector);
      }
    }

    Object.entries(rest).forEach(([key, { css }]) => {
      const selector = parserConfig?.getSelector?.(key, css) || ':root';
      if (Object.keys(css).length) {
        stylesheets.push(typeof selector === 'string' ? { [selector]: { ...css } } : selector);
      }
    });
  };

  return {
    vars: themeVars,
    generateCssVars,
    generateStyleSheets,
  };
}

export default prepareCssVars;
