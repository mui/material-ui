import { deepmerge } from '@mui/utils';
import { unstable_createCssVarsProvider as createCssVarsProvider } from '@mui/system';
import defaultTheme from './defaultTheme';
import { CssVarsThemeOptions } from './extendTheme';
import { createSoftInversion, createSolidInversion } from './variantUtils';
import type { Theme, DefaultColorScheme, ExtendedColorScheme } from './types';
import THEME_ID from './identifier';

const { CssVarsProvider, useColorScheme, getInitColorSchemeScript } = createCssVarsProvider<
  DefaultColorScheme | ExtendedColorScheme,
  typeof THEME_ID
>({
  themeId: THEME_ID,
  theme: defaultTheme,
  attribute: 'data-joy-color-scheme',
  modeStorageKey: 'joy-mode',
  colorSchemeStorageKey: 'joy-color-scheme',
  defaultColorScheme: {
    light: 'light',
    dark: 'dark',
  },
  resolveTheme: (mergedTheme: Theme) => {
    const colorInversionInput = mergedTheme.colorInversion as CssVarsThemeOptions['colorInversion'];
    let defaultColorInversion = {
      soft: createSoftInversion(mergedTheme),
      solid: createSolidInversion(mergedTheme),
    };
    if (mergedTheme.cssVarPrefix !== 'joy') {
      defaultColorInversion = JSON.parse(
        JSON.stringify(defaultColorInversion).replace(
          /--joy/g,
          mergedTheme.cssVarPrefix ? `--${mergedTheme.cssVarPrefix}` : '-',
        ),
      );
    }
    mergedTheme.colorInversion = deepmerge(
      defaultColorInversion,
      typeof colorInversionInput === 'function'
        ? colorInversionInput(mergedTheme)
        : colorInversionInput,
      { clone: false },
    );
    return mergedTheme;
  },
});

export { CssVarsProvider, useColorScheme, getInitColorSchemeScript };
