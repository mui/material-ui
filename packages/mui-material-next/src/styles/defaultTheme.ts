import { deepmerge } from '@mui/utils';
import extendTheme from './extendTheme';
import type { Theme, CssVarsThemeOptions, ColorSystemOptions } from './Theme.types';

export const getThemeWithVars = (
  themeInput?: Omit<CssVarsThemeOptions, 'colorSchemes'> & ColorSystemOptions,
) => {
  const {
    colorSchemes,
    opacity,
    overlays,
    shape,
    state,
    typescale,
    palette: paletteInput,
    ...restTheme
  } = extendTheme(themeInput);
  const colorSchemePalette = deepmerge(
    colorSchemes[paletteInput?.colorScheme || 'light'].palette,
    paletteInput,
  );
  const { mode = 'light', colorScheme = 'light', ...palette } = colorSchemePalette;

  return {
    opacity,
    overlays,
    shape,
    state,
    typescale,
    ...restTheme,
    colorSchemes: {
      ...colorSchemes,
      [colorScheme]: palette,
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
      state,
      typescale,
      palette,
    },
  } as unknown as Theme;
};

const defaultTheme = getThemeWithVars();

export default defaultTheme;
