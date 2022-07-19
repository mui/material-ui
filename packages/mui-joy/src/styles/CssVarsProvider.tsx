import { unstable_createCssVarsProvider as createCssVarsProvider } from '@mui/system';
import extendTheme from './extendTheme';
import type { DefaultColorScheme, ExtendedColorScheme } from './types';

const shouldSkipGeneratingVar = (keys: string[]) =>
  !!keys[0].match(/(typography|variants|focus|breakpoints)/);

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
  shouldSkipGeneratingVar,
});

export { CssVarsProvider, useColorScheme, getInitColorSchemeScript, shouldSkipGeneratingVar };
