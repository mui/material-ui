import { deepmerge } from '@material-ui/utils';

export const toCssVar = (key) =>
  Array.isArray(key) ? `--${key.join('-')}` : `--${key.toString().replace(/\./g, '-')}`;

export const CssVarsBuilder = (object, options = {}) => {
  const { formatter = toCssVar } = options || {};
  const result = { cssVars: {}, cssVarsMap: Array.isArray(object) ? [] : {} };
  Object.entries(object).forEach(([key, value]) => {
    if (['number', 'string'].indexOf(typeof value) !== -1) {
      const cssVar = formatter(key);
      result.cssVars[cssVar] = value;
      result.cssVarsMap[key] = `var(${cssVar})`;
    }
  });
  return result;
};

export const makeAliasVars = (alias, options = {}) => {
  const { formatter = toCssVar } = options;
  const themeCssVars = {};
  const cssVarsMap = {};
  Object.entries(alias).forEach(([key, value]) => {
    Object.entries(value).forEach(([mode, cssValue]) => {
      if (!themeCssVars[mode]) {
        themeCssVars[mode] = {};
      }
      const cssVar = formatter(key);
      themeCssVars[mode][cssVar] = cssValue;
      cssVarsMap[key] = `var(${cssVar})`;
    });
  });

  return { themeCssVars, cssVarsMap };
};

export const makeCssVars = (host) => {
  const cssVars = {};
  const cssVarsMap = {};

  function recurse(object, nestedCssVarsMap = cssVarsMap, parentKeys = []) {
    const newResult = CssVarsBuilder(object, {
      formatter: (lastKey) => toCssVar([...parentKeys, lastKey]),
    });
    Object.assign(cssVars, newResult.cssVars);
    Object.assign(nestedCssVarsMap, newResult.cssVarsMap);

    Object.entries(object).forEach(([key, value]) => {
      if (typeof value === 'object' && Object.keys(value).length > 0) {
        nestedCssVarsMap[key] = Array.isArray(value) ? [] : {};
        recurse(value, nestedCssVarsMap[key], [...parentKeys, key]);
      }
    });
  }
  recurse(host);
  return { cssVars, cssVarsMap };
};

export const generateGlobalVars = (themeCssVars, options = {}) => {
  const {
    defaultSchemeKey = 'light',
    light = 'light',
    dark = 'dark',
    attribute = 'data-theme',
  } = options;
  const {
    [defaultSchemeKey]: rootSchemeVars,
    [light]: lightScheme,
    [dark]: darkScheme,
  } = themeCssVars;
  const attributeThemeVars = {};
  Object.entries(themeCssVars).forEach(([themeName, cssVars]) => {
    attributeThemeVars[`[${attribute}="${themeName}"]`] = cssVars;
  });
  return {
    // system preference
    ':root': rootSchemeVars || themeCssVars[Object.keys(themeCssVars)[0]],
    '@media(prefers-color-scheme: light)': {
      ':root': lightScheme,
    },
    '@media(prefers-color-scheme: dark)': {
      ':root': darkScheme,
    },
    // application preference
    ...attributeThemeVars,
  };
};

export const makeCssVarsTheme = (theme, options = {}) => {
  const { alias = {} } = options;
  const themeVars = {};
  let themeCssVarsMap = {};
  Object.entries(theme).forEach(([themeName, themeInput]) => {
    const { cssVars, cssVarsMap } = makeCssVars({ palette: themeInput.palette });
    themeVars[themeName] = cssVars;
    themeCssVarsMap = deepmerge(themeCssVarsMap, cssVarsMap);
  });

  const aliasVars = makeAliasVars(alias);

  theme.cssVarsMap = {
    ...themeCssVarsMap,
    alias: aliasVars.cssVarsMap,
  };
  return { theme, tokenThemeVars: themeVars, aliasThemeVars: aliasVars.themeCssVars };
};

export default {};
