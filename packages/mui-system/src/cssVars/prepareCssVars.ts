import deepmerge from '@mui/utils/deepmerge';
import cssVarsParser from './cssVarsParser';

export interface DefaultCssVarsTheme {
  colorSchemes?: Record<string, any>;
  defaultColorScheme?: string;
}

function prepareCssVars<T extends DefaultCssVarsTheme, ThemeVars extends Record<string, any>>(
  theme: T,
  parserConfig: {
    prefix?: string;
    colorSchemeSelector?: 'media' | 'class' | 'data' | string;
    disableCssColorScheme?: boolean;
    shouldSkipGeneratingVar?: (objectPathKeys: Array<string>, value: string | number) => boolean;
    getSelector?: (
      colorScheme: keyof T['colorSchemes'] | undefined,
      css: Record<string, any>,
    ) => string | Record<string, any>;
  } = {},
) {
  const {
    getSelector = defaultGetSelector,
    disableCssColorScheme,
    colorSchemeSelector: selector,
  } = parserConfig;
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

  function defaultGetSelector(
    colorScheme: keyof T['colorSchemes'] | undefined,
    cssObject: Record<string, any>,
  ) {
    let rule = selector;
    if (selector === 'class') {
      rule = '.%s';
    }
    if (selector === 'data') {
      rule = '[data-%s]';
    }
    if (selector?.startsWith('data-') && !selector.includes('%s')) {
      // 'data-joy-color-scheme' -> '[data-joy-color-scheme="%s"]'
      rule = `[${selector}="%s"]`;
    }
    if (colorScheme) {
      if (rule === 'media') {
        if (theme.defaultColorScheme === colorScheme) {
          return ':root';
        }
        const mode = colorSchemes[colorScheme as string]?.palette?.mode || colorScheme;
        return {
          [`@media (prefers-color-scheme: ${mode})`]: {
            ':root': cssObject,
          },
        };
      }
      if (rule) {
        if (theme.defaultColorScheme === colorScheme) {
          return `:root, ${rule.replace('%s', String(colorScheme))}`;
        }
        return rule.replace('%s', String(colorScheme));
      }
    }
    return ':root';
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
    function insertStyleSheet(key: string | object, css: Record<string, string | number>) {
      if (Object.keys(css).length) {
        stylesheets.push(typeof key === 'string' ? { [key]: { ...css } } : key);
      }
    }
    insertStyleSheet(getSelector(undefined, { ...rootCss }), rootCss);

    const { [colorScheme]: defaultSchemeVal, ...other } = colorSchemesMap;

    if (defaultSchemeVal) {
      // default color scheme has to come before other color schemes
      const { css } = defaultSchemeVal;
      const cssColorSheme = colorSchemes[colorScheme]?.palette?.mode;
      const finalCss =
        !disableCssColorScheme && cssColorSheme
          ? { colorScheme: cssColorSheme, ...css }
          : { ...css };
      insertStyleSheet(
        getSelector(colorScheme as keyof T['colorSchemes'], { ...finalCss }),
        finalCss,
      );
    }

    Object.entries(other).forEach(([key, { css }]) => {
      const cssColorSheme = colorSchemes[key]?.palette?.mode;
      const finalCss =
        !disableCssColorScheme && cssColorSheme
          ? { colorScheme: cssColorSheme, ...css }
          : { ...css };
      insertStyleSheet(getSelector(key as keyof T['colorSchemes'], { ...finalCss }), finalCss);
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
