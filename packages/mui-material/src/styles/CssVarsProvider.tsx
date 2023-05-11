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
import THEME_ID from './identifier';

const defaultTheme = experimental_extendTheme();

const { CssVarsProvider, useColorScheme, getInitColorSchemeScript } = createCssVarsProvider<
  SupportedColorScheme,
  typeof THEME_ID
>({
  themeId: THEME_ID,
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
  excludeVariablesFromRoot,
});

export {
  useColorScheme,
  getInitColorSchemeScript,
  CssVarsProvider as Experimental_CssVarsProvider,
};
