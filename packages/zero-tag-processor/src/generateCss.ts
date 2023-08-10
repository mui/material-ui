import createEmotion from '@emotion/css/create-instance';
import type { Theme } from '@mui/material/styles';
import type { PluginCustomOptions } from './utils/cssFnValueToVariable';

type CssGenerationOptions = {
  injectInRoot?: boolean;
  defaultThemeKey?: string;
};

type RelevantTokenKey = keyof Pick<
  Theme,
  'palette' | 'shadows' | 'shape' | 'typography' | 'zIndex'
>;
const topLevelTokenKeys: RelevantTokenKey[] = [
  'palette',
  'shadows',
  'shape',
  'typography',
  'zIndex',
];

type CssVarsObject = Record<string, string | number | undefined>;

function iterateObject(tokenObject: object, cssVarsObject: CssVarsObject, prefix: string[]) {
  if (Array.isArray(tokenObject)) {
    tokenObject.forEach((item, index) => {
      iterateObject(item, cssVarsObject, prefix.concat(`${index}`));
    });
  } else if (typeof tokenObject === 'object') {
    Object.entries(tokenObject).forEach(([key, value]) => {
      iterateObject(value, cssVarsObject, prefix.concat(key));
    });
  } else if (['string', 'number', 'boolean'].includes(typeof tokenObject)) {
    const cssVariableName = `--${prefix.filter(Boolean).join('-')}`;
    cssVarsObject[cssVariableName] = tokenObject;
  }
}

function generateCssForTheme(theme: Theme, prefix = ['']) {
  const cssVarsObject: CssVarsObject = {};
  topLevelTokenKeys.forEach((themeKey: RelevantTokenKey) => {
    const nestedPrefix = prefix.concat(themeKey);
    const tokenValue = theme[themeKey];
    iterateObject(tokenValue, cssVarsObject, nestedPrefix);
  });
  return cssVarsObject;
}

// eslint-disable-next-line import/prefer-default-export
export function generateCss(
  options: PluginCustomOptions,
  generationOptions: CssGenerationOptions = {},
) {
  const { injectInRoot = true, defaultThemeKey = 'theme' } = generationOptions;
  const { css, cache } = createEmotion({
    key: 'mui-theme',
  });
  const { cssVariablesPrefix = 'mui', themeArgs } = options;
  if (!themeArgs) {
    return '';
  }
  let cssStr = '';
  Object.entries(themeArgs).forEach(([themeKey, theme]) => {
    const cssVarsObject = generateCssForTheme(theme, [cssVariablesPrefix]);
    const cssThemeObject: Record<string, CssVarsObject> = {};
    if (themeKey === defaultThemeKey) {
      if (injectInRoot) {
        cssThemeObject[':root'] = cssVarsObject;
      } else {
        cssThemeObject['.theme'] = cssVarsObject;
      }
    } else {
      cssThemeObject[`.${themeKey}`] = cssVarsObject;
    }
    const cssClass = css(cssThemeObject);
    cssStr += cache.registered[cssClass];
  });
  return cssStr;
}
