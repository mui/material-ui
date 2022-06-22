/* eslint-disable @typescript-eslint/naming-convention */
import { unstable_createCssVarsProvider as createCssVarsProvider } from '@mui/system';
import experimental_extendTheme from './experimental_extendTheme';
import createTypography from './createTypography';

const defaultTheme = experimental_extendTheme();

const {
  CssVarsProvider: Experimental_CssVarsProvider,
  useColorScheme,
  getInitColorSchemeScript,
} = createCssVarsProvider({
  theme: defaultTheme,
  attribute: 'data-mui-color-scheme',
  modeStorageKey: 'mui-mode',
  colorSchemeStorageKey: 'mui-color-scheme',
  defaultColorScheme: {
    light: 'light',
    dark: 'dark',
  },
  prefix: 'mui',
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

export { useColorScheme, getInitColorSchemeScript, Experimental_CssVarsProvider };
