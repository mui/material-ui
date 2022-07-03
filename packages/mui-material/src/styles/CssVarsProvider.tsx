import { unstable_createCssVarsProvider as createCssVarsProvider } from '@mui/system';
import experimental_extendTheme, {
  SupportedColorScheme,
  CssVarsTheme,
} from './experimental_extendTheme';
import createTypography from './createTypography';

const shouldSkipGeneratingVar = (keys: string[]) =>
  !!keys[0].match(/(typography|mixins|breakpoints|direction|transitions)/) ||
  (keys[0] === 'palette' && !!keys[1]?.match(/(mode|contrastThreshold|tonalOffset)/));

const defaultTheme = experimental_extendTheme();

const { CssVarsProvider, useColorScheme, getInitColorSchemeScript } = createCssVarsProvider<
  SupportedColorScheme,
  CssVarsTheme
>({
  theme: defaultTheme,
  attribute: 'data-mui-color-scheme',
  modeStorageKey: 'mui-mode',
  colorSchemeStorageKey: 'mui-color-scheme',
  defaultColorScheme: {
    light: 'light',
    dark: 'dark',
  },
  resolveTheme: (theme) => {
    const newTheme = {
      ...theme,
      typography: createTypography(theme.palette, theme.typography),
    };

    return newTheme;
  },
  shouldSkipGeneratingVar,
});

export {
  useColorScheme,
  getInitColorSchemeScript,
  shouldSkipGeneratingVar,
  CssVarsProvider as Experimental_CssVarsProvider,
};
