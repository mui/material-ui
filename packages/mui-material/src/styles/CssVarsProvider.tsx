import { unstable_createCssVarsProvider as createCssVarsProvider } from '@mui/system';
import createTheme, { Theme } from './createTheme';
import { PaletteWithChannels } from './createPalette';

export interface ThemeInput extends Theme {
  colorSchemes: Partial<
    Record<
      'light' | 'dark',
      {
        palette: PaletteWithChannels;
      }
    >
  >;
}

const { palette: lightPalette, ...defaultTheme } = createTheme();
const { palette: darkPalette } = createTheme({ palette: { mode: 'dark' } });

const { CssVarsProvider, useColorScheme, getInitColorSchemeScript } = createCssVarsProvider<
  'light' | 'dark',
  ThemeInput
>({
  theme: {
    ...defaultTheme,
    colorSchemes: {
      // TODO: Shuold we remove the non color scheme values from here, like getContrastText, contrastThreshold etc.
      light: { palette: lightPalette },
      dark: { palette: darkPalette },
    },
  },
  defaultColorScheme: {
    light: 'light',
    dark: 'dark',
  },
  prefix: 'md',
  shouldSkipGeneratingVar: (keys) =>
    !!keys[0].match(/(typography|mixins|breakpoints|direction|transitions)/),
});

export { useColorScheme, getInitColorSchemeScript, CssVarsProvider };
