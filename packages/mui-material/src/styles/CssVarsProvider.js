import { unstable_createCssVarsProvider as createCssVarsProvider } from '@mui/system';
import unstable_createTheme from './unstable_createTheme';
import createTypography from './createTypography';

const defaultTheme = unstable_createTheme();

const { CssVarsProvider, useColorScheme, getInitColorSchemeScript } = createCssVarsProvider({
  theme: defaultTheme,
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
