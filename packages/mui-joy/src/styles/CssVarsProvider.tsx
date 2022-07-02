import { unstable_createCssVarsProvider as createCssVarsProvider } from '@mui/system';
import extendTheme from './extendTheme';
import type { Theme, DefaultColorScheme, ExtendedColorScheme } from './types';

const { CssVarsProvider, useColorScheme, getInitColorSchemeScript } = createCssVarsProvider<
  DefaultColorScheme | ExtendedColorScheme,
  Theme
>({
  theme: extendTheme(),
  attribute: 'data-joy-color-scheme',
  modeStorageKey: 'joy-mode',
  colorSchemeStorageKey: 'joy-color-scheme',
  defaultColorScheme: {
    light: 'light',
    dark: 'dark',
  },
  prefix: 'joy',
  shouldSkipGeneratingVar: (keys) =>
    keys[0] === 'typography' ||
    keys[0] === 'variants' ||
    keys[0] === 'focus' ||
    keys[0] === 'breakpoints',
});

export { CssVarsProvider, useColorScheme, getInitColorSchemeScript };
