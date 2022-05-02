import { deepmerge } from '@mui/utils';
import extendTheme from './extendTheme';
import type { ThemeInput, ColorSystemInput } from './extendTheme';
import type { Theme, RuntimeColorSystem } from './types';

export const getThemeWithVars = (
  themeInput?: Omit<ThemeInput, 'colorSchemes'> & ColorSystemInput,
): Theme => {
  const {
    colorSchemes,
    breakpoints,
    spacing,
    getCssVar,
    palette: paletteInput,
    ...scales
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

  const defaultTheme = {
    ...scales,
    colorSchemes: {
      ...colorSchemes,
      [colorScheme]: palette,
    },
    palette: {
      ...palette,
      mode,
      colorScheme,
    },
    breakpoints,
    spacing,
    getCssVar,
    vars: { ...scales, palette },
  };
  return defaultTheme;
};

const defaultTheme = getThemeWithVars();

export default defaultTheme;
