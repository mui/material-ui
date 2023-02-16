import { deepmerge } from '@mui/utils';
import { unstable_createCssVarsProvider as createCssVarsProvider } from '@mui/system';
import extendTheme, { CssVarsThemeOptions } from './extendTheme';
import { createSoftInversion, createSolidInversion } from './variantUtils';
import type { Theme, DefaultColorScheme, ExtendedColorScheme } from './types';

const { CssVarsProvider, useColorScheme, getInitColorSchemeScript } = createCssVarsProvider<
  DefaultColorScheme | ExtendedColorScheme
>({
  theme: extendTheme(),
  attribute: 'data-joy-color-scheme',
  modeStorageKey: 'joy-mode',
  colorSchemeStorageKey: 'joy-color-scheme',
  defaultColorScheme: {
    light: 'light',
    dark: 'dark',
  },
  resolveTheme: (mergedTheme: Theme) => {
    const colorInversionInput = mergedTheme.colorInversion as CssVarsThemeOptions['colorInversion'];
    mergedTheme.colorInversion = deepmerge(
      {
        soft: createSoftInversion(mergedTheme),
        solid: createSolidInversion(mergedTheme),
      },
      typeof colorInversionInput === 'function'
        ? colorInversionInput(mergedTheme)
        : colorInversionInput,
      { clone: false },
    );
    return mergedTheme;
  },
});

export { CssVarsProvider, useColorScheme, getInitColorSchemeScript };
