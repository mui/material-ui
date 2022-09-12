import { deepmerge } from '@mui/utils';
import extendTheme from './extendTheme';
import type { CssVarsThemeOptions, ColorSystemOptions } from './extendTheme';
import type { Theme, RuntimeColorSystem } from './types';

export const getThemeWithVars = (
  themeInput?: Omit<CssVarsThemeOptions, 'colorSchemes'> & ColorSystemOptions,
) => {
  const {
    colorSchemes,
    fontFamily,
    fontSize,
    fontWeight,
    letterSpacing,
    lineHeight,
    radius,
    shadow,
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
    ...palette
  } = colorSchemePalette as RuntimeColorSystem['palette'];

  return {
    fontFamily,
    fontSize,
    fontWeight,
    letterSpacing,
    lineHeight,
    radius,
    shadow,
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
    vars: { fontFamily, fontSize, fontWeight, letterSpacing, lineHeight, radius, shadow, palette },
  } as unknown as Theme;
};

const defaultTheme = getThemeWithVars();

export default defaultTheme;
