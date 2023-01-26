import { deepmerge } from '@mui/utils';
import { unstable_styleFunctionSx as styleFunctionSx, SxProps } from '@mui/system';
import extendTheme from './extendTheme';
import type { Theme, CssVarsThemeOptions, ColorSystemOptions } from './Theme.types';
import defaultSxConfig from './sxConfig';

export const getThemeWithVars = (
  themeInput?: Omit<CssVarsThemeOptions, 'colorSchemes'> & ColorSystemOptions,
) => {
  const {
    colorSchemes,
    opacity,
    overlays,
    shape,
    ref,
    sys,
    palette: paletteInput,
    ...restTheme
  } = extendTheme(themeInput);
  const colorSchemePalette = deepmerge(
    colorSchemes[paletteInput?.colorScheme || 'light'].palette,
    paletteInput,
  );

  const {
    mode = 'light',
    colorScheme = 'light',
    // @ts-ignore md3 specific token
    ref: colorSchemeRef,
    // @ts-ignore md3 specific token
    sys: colorSchemeSys,
    ...palette
  } = colorSchemePalette;

  return {
    opacity,
    overlays,
    shape,
    ref: {
      ...ref,
      ...colorSchemeRef,
    },
    sys: {
      ...sys,
      ...colorSchemeSys,
    },
    ...restTheme,
    colorSchemes: {
      ...colorSchemes,
      [colorScheme]: {
        palette,
        ref: colorSchemeRef,
        sys: colorSchemeSys,
      },
    },
    palette: {
      ...palette,
      mode,
      colorScheme,
    },
    vars: {
      opacity,
      overlays,
      shape,
      ref: {
        ...ref,
        ...colorSchemeRef,
      },
      sys: {
        ...sys,
        ...colorSchemeSys,
      },
      palette,
    },
  } as unknown as Theme;
};

const defaultTheme = getThemeWithVars();

defaultTheme.unstable_sxConfig = defaultSxConfig;
defaultTheme.unstable_sx = function sx(props: SxProps<Theme>) {
  return styleFunctionSx({ sx: props, theme: this });
};

export default defaultTheme;
