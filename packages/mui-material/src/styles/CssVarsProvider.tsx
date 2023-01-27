import {
  unstable_createCssVarsProvider as createCssVarsProvider,
  SxProps,
  unstable_styleFunctionSx as styleFunctionSx,
} from '@mui/system';
import experimental_extendTheme, {
  SupportedColorScheme,
  CssVarsTheme,
} from './experimental_extendTheme';
import createTypography from './createTypography';
import excludeVariablesFromRoot from './excludeVariablesFromRoot';

const shouldSkipGeneratingVar = (keys: string[]) =>
  !!keys[0].match(/(typography|mixins|breakpoints|direction|transitions)/) ||
  !!keys[0].match(/sxConfig$/) || // ends with sxConfig
  (keys[0] === 'palette' && !!keys[1]?.match(/(mode|contrastThreshold|tonalOffset)/));

const defaultTheme = experimental_extendTheme();

const { CssVarsProvider, useColorScheme, getInitColorSchemeScript } =
  createCssVarsProvider<SupportedColorScheme>({
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

      newTheme.unstable_sx = function sx(props: SxProps<CssVarsTheme>) {
        return styleFunctionSx({
          sx: props,
          theme: this,
        });
      };

      return newTheme;
    },
    shouldSkipGeneratingVar,
    excludeVariablesFromRoot,
  });

export {
  useColorScheme,
  getInitColorSchemeScript,
  shouldSkipGeneratingVar,
  CssVarsProvider as Experimental_CssVarsProvider,
};
