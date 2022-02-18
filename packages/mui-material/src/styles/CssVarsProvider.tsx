import { unstable_createCssVarsProvider as createCssVarsProvider } from '@mui/system';
import { deepmerge } from '@mui/utils';
import createTheme, { ThemeOptions, Theme } from './createTheme';
import { PaletteOptions } from './createPalette';

interface ThemeInput extends ThemeOptions {
  colorSchemes?: Partial<
    Record<
      'light' | 'dark',
      Omit<PaletteOptions, 'getContrastText' | 'contrastThreshold' | 'tonalOffset' | 'mode'>
    >
  >;
}

interface ThemeWithColorSchemes extends Theme {
  mode: 'light' | 'dark';
  colorSchemes: Record<
    'light' | 'dark',
    Omit<PaletteOptions, 'getContrastText' | 'contrastThreshold' | 'tonalOffset' | 'mode'>
  >;
}

const defaultTheme = createTheme();
const darkTheme = createTheme({ palette: { mode: 'dark' } });

const { CssVarsProvider, useColorScheme, getInitColorSchemeScript } = createCssVarsProvider<'light' | 'dark', ThemeInput>({
  theme: {
    ...defaultTheme,
    colorSchemes: {
      // TODO: Shuold we remove the non color scheme values from here, like getContrastText, contrastThreshold etc.
      light: { palette: defaultTheme.palette },
      dark: { palette: darkTheme.palette },
    },
  },
  defaultColorScheme: {
    light: 'light',
    dark: 'dark',
  },
  resolveTheme: (mergedTheme) => {
    console.log(mergedTheme);
    return mergedTheme;
  },
  shouldSkipGeneratingVar: (keys) =>
    keys[0] === 'typography' || keys[0] === 'mixins' || keys[0] === 'breakpoints',
});

export { useColorScheme, getInitColorSchemeScript, CssVarsProvider };
