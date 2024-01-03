import set from 'lodash.set';
import type { PluginCustomOptions } from './cssFnValueToVariable';
import { css, cache } from './emotion';

type Primitive = string | number | null | undefined;
type CssVarsObject = Record<string, Primitive>;

type ExtendTheme = {
  cssVarPrefix?: string;
  colorSchemes: Record<string, unknown>;
  generateCssVars: (colorScheme?: string) => {
    css: CssVarsObject;
  };
  getColorSchemeSelector?: (colorScheme?: string) => string;
};

export type Theme = {
  [key: 'unstable_sxConfig' | string]: string | number | Theme;
};

type CssGenerationOptions = {
  injectInRoot?: boolean;
  defaultThemeKey?: string;
};

type RelevantTokenKey =
  | 'palette'
  | 'shadows'
  | 'shape'
  | 'typography'
  | 'zIndex'
  | 'direction'
  | 'transitions';
const TOP_LEVEL_TOKEN_KEYS: RelevantTokenKey[] = [
  'palette',
  'shadows',
  'shape',
  'typography',
  'zIndex',
  'direction',
  'transitions',
];

type Walkable = {
  [Key in string | number]: Primitive | Walkable;
};

function iterateObject<T extends Walkable>(
  tokenObject: Primitive | T,
  prefix: string[],
  fn: (value: Primitive, path: string[]) => void,
) {
  if (
    tokenObject === null ||
    typeof tokenObject === 'string' ||
    typeof tokenObject === 'number' ||
    typeof tokenObject === 'boolean'
  ) {
    fn(tokenObject, prefix);
  } else if (Array.isArray(tokenObject)) {
    tokenObject.forEach((item, index) => {
      iterateObject(item, prefix.concat(`${index}`), fn);
    });
  } else if (typeof tokenObject === 'object') {
    Object.entries(tokenObject).forEach(([key, value]) => {
      iterateObject(value, prefix.concat(key), fn);
    });
  }
}

function generateCssForTheme(theme: Theme, prefix = ['']) {
  const cssVarsObject: CssVarsObject = {};
  TOP_LEVEL_TOKEN_KEYS.forEach((themeKey: RelevantTokenKey) => {
    const nestedPrefix = prefix.concat(themeKey);
    const tokenValue = theme[themeKey];
    iterateObject(tokenValue as Walkable, nestedPrefix, (value, path: string[]) => {
      const cssVariableName = `--${path.filter(Boolean).join('-')}`;
      cssVarsObject[cssVariableName] =
        // eslint-disable-next-line no-nested-ternary
        typeof value === 'string' ? value : value ? value.toString() : null;
    });
  });
  return cssVarsObject;
}

function generateCssFromExtendTheme(theme: ExtendTheme, injectInRoot = false) {
  const { cssVarPrefix = 'mui' } = theme;
  let cssStr = '';
  Object.keys(theme.colorSchemes).forEach((colorScheme) => {
    let selector =
      theme.getColorSchemeSelector?.(colorScheme) ??
      `[data-${cssVarPrefix}-color-scheme="${colorScheme}"]`;
    if (injectInRoot && colorScheme === 'light') {
      selector = `:root, ${selector}`;
    }
    const cssObject = theme.generateCssVars(colorScheme).css;
    const cssClass = css({
      [selector]: cssObject,
    });
    cssStr += cache.registered[cssClass];
  });
  return cssStr;
}

export function generateCss(
  options: PluginCustomOptions,
  generationOptions: CssGenerationOptions = {},
) {
  const { injectInRoot = true, defaultThemeKey = 'theme' } = generationOptions;
  const { cssVariablesPrefix = 'mui', themeArgs } = options;
  if (!themeArgs) {
    return '';
  }
  let cssStr = '';
  Object.entries(themeArgs).forEach(([themeKey, theme]) => {
    if (
      theme &&
      typeof theme === 'object' &&
      'generateCssVars' in theme &&
      typeof theme.generateCssVars === 'function'
    ) {
      cssStr += generateCssFromExtendTheme(theme as ExtendTheme, injectInRoot);
      return;
    }
    const cssVarsObject = generateCssForTheme(theme as Theme, [cssVariablesPrefix]);
    const cssThemeObject: Record<string, CssVarsObject> = {};
    if (themeKey === defaultThemeKey && injectInRoot) {
      cssThemeObject[':root'] = cssVarsObject;
    } else {
      cssThemeObject[`.${themeKey}`] = cssVarsObject;
    }
    const cssClass = css(cssThemeObject);
    cssStr += cache.registered[cssClass];
  });
  return cssStr;
}

export function generateThemeTokens(theme: unknown, prefix = '') {
  if (!theme || typeof theme !== 'object') {
    return {};
  }
  // is created using extendTheme
  if ('vars' in theme && theme.vars) {
    return {
      vars: theme.vars,
    };
  }
  const tokens = {};
  iterateObject(theme as Walkable, [], (value, path) => {
    if (!TOP_LEVEL_TOKEN_KEYS.includes(path[0] as RelevantTokenKey)) {
      return;
    }
    const filteredPath = path.filter(Boolean);
    const cssVariableName = `--${[prefix, ...filteredPath].filter(Boolean).join('-')}`;
    set(tokens, filteredPath, `var(${cssVariableName}, ${value})`);
  });
  return tokens;
}
