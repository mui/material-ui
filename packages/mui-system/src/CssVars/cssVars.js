import { deepmerge } from '@mui/utils';

export const toCssVar = (key) =>
  Array.isArray(key) ? `--${key.join('-')}` : `--${key.toString().replace(/\./g, '-')}`;

export const CssVarsBuilder = (object, options = {}) => {
  const { formatter = toCssVar, shouldSkipKey } = options || {};
  const result = { cssVars: {}, cssVarsMap: Array.isArray(object) ? [] : {} };
  Object.entries(object).forEach(([key, value]) => {
    if (shouldSkipKey && shouldSkipKey(key)) {
      return;
    }
    if (['number', 'string'].indexOf(typeof value) !== -1) {
      const cssVar = formatter(key);
      result.cssVars[cssVar] = value;
      result.cssVarsMap[key] = `var(${cssVar})`;
    }
  });
  return result;
};

export const makeAliasVars = (alias, options = {}) => {
  if (!alias) {
    return {};
  }
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

  return { ...themeCssVars, cssVarsMap };
};

export const makeCssVars = (host, options = {}) => {
  const { shouldSkipKey } = options;
  const cssVars = {};
  const cssVarsMap = {};

  function recurse(object, nestedCssVarsMap = cssVarsMap, parentKeys = []) {
    const newResult = CssVarsBuilder(object, {
      formatter: (lastKey) => toCssVar([...parentKeys, lastKey]),
      shouldSkipKey,
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
  if (!themeCssVars) {
    return themeCssVars;
  }
  const {
    light = 'light',
    dark = 'dark',
    attribute = 'data-theme',
    enableColorScheme = true,
  } = options;
  const { [light]: lightScheme, [dark]: darkScheme } = themeCssVars;
  const attributeThemeVars = {};
  Object.entries(themeCssVars).forEach(([themeName, cssVars]) => {
    attributeThemeVars[`[${attribute}="${themeName}"]`] = cssVars;
  });
  return {
    // TODO dont need this,
    ...(enableColorScheme && {
      '@media(prefers-color-scheme: light)': {
        ':root': lightScheme,
      },
      '@media(prefers-color-scheme: dark)': {
        ':root': darkScheme,
      },
    }),
    // application preference
    ...attributeThemeVars,
  };
};

export const generateSchemeVars = (schemeCssVars, options = {}) => {
  if (!schemeCssVars) {
    return schemeCssVars;
  }
  const { attribute = 'data-theme' } = options;
  const attributeThemeVars = {};
  Object.entries(schemeCssVars).forEach(([themeName, cssVars]) => {
    attributeThemeVars[`[${attribute}="${themeName}"]`] = cssVars;
  });
  return attributeThemeVars;
};

export const makeCssVarsTheme = (scope, input) => {
  if (!input) {
    return input;
  }
  // input = { [schemeKey]: { ... } }
  const themeVars = {};
  let cssVarsMap = {};
  Object.entries(input).forEach(([schemeKey, schemeInput]) => {
    const result = makeCssVars({ [scope]: schemeInput });
    themeVars[schemeKey] = result.cssVars;
    cssVarsMap = deepmerge(cssVarsMap, result.cssVarsMap);
  });

  return { ...themeVars, cssVarsMap };
};

export const generateCssVars = ({
  theme,
  paletteSchemes,
  currentScheme = theme.palette.mode,
  alias,
}) => {
  const finalTheme = { ...theme };
  const root = makeCssVars(theme, {
    shouldSkipKey: (key) => key === 'mode',
  });
  const { cssVarsMap: schemeVarsMap, ...schemeCssVars } = makeCssVarsTheme(
    'palette',
    paletteSchemes,
  );
  const { cssVarsMap: aliasVarsMap, ...aliasCssVars } = makeAliasVars(alias);

  finalTheme.vars = root.cssVarsMap;

  if (paletteSchemes && paletteSchemes[currentScheme]) {
    finalTheme.palette = { mode: currentScheme, ...paletteSchemes[currentScheme] };
  }

  if (aliasVarsMap) {
    finalTheme.alias = aliasVarsMap;
  }

  return {
    theme: finalTheme,
    rootCssVars: root.cssVars,
    ...(paletteSchemes && { schemeCssVars }),
    ...(alias && { aliasCssVars }),
  };
};

export default {};
