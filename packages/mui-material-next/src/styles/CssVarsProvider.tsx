import {
  unstable_createCssVarsProvider as createCssVarsProvider,
  unstable_styleFunctionSx as styleFunctionSx,
  SxProps,
} from '@mui/system';
import {
  SupportedColorScheme,
  private_createTypography as createTypography,
  private_excludeVariablesFromRoot as excludeVariablesFromRoot,
} from '@mui/material/styles';
import { Theme } from './Theme.types';
import defaultTheme from './defaultTheme';

const shouldSkipGeneratingVar = (keys: string[]) =>
  !!keys[0].match(/(typography|mixins|breakpoints|direction|transitions)/) ||
  (keys[0] === 'palette' && !!keys[1]?.match(/(mode|contrastThreshold|tonalOffset)/));

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

      newTheme.unstable_sx = function sx(props: SxProps<Theme>) {
        return styleFunctionSx({ sx: props, theme: this });
      };
      return newTheme;
    },
    shouldSkipGeneratingVar,
    excludeVariablesFromRoot,
  });

export { useColorScheme, getInitColorSchemeScript, shouldSkipGeneratingVar, CssVarsProvider };
