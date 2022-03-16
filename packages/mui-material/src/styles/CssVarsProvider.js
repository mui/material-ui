import { unstable_createCssVarsProvider as createCssVarsProvider } from '@mui/system';
import { defaultOpacity } from './unstable_createTheme';
import createTheme from './createTheme';
import createTypography from './createTypography';

const { palette: lightPalette, ...defaultTheme } = createTheme();
const { palette: darkPalette } = createTheme({ palette: { mode: 'dark' } });

const { CssVarsProvider, useColorScheme, getInitColorSchemeScript } = createCssVarsProvider({
  theme: {
    ...defaultTheme,
    colorSchemes: {
      light: { palette: lightPalette },
      dark: { palette: darkPalette },
    },
    opacity: defaultOpacity,
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
