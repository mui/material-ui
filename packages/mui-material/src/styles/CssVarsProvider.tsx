import { unstable_createCssVarsProvider as createCssVarsProvider } from '@mui/system';
import createTheme from './createTheme';
import { ThemeOptions } from './unstable_createTheme';
import { PaletteWithChannels } from './createPalette';
import createTypography from './createTypography';

export interface ThemeInput extends ThemeOptions {
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
      light: { palette: lightPalette },
      dark: { palette: darkPalette },
    },
  },
  defaultColorScheme: {
    light: 'light',
    dark: 'dark',
  },
  prefix: 'md',
  resolveTheme: (theme) => {
    const newTheme = {
      ...theme,
      typography: createTypography(theme.palette, theme.typography),
    };

    return newTheme;
  },
  shouldSkipGeneratingVar: (keys) =>
    !!keys[0].match(/(typography|mixins|breakpoints|direction|transitions)/),
});

export { useColorScheme, getInitColorSchemeScript, CssVarsProvider };
