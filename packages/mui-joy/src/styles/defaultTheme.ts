import { deepmerge } from '@mui/utils';
import extendTheme from './extendTheme';
import type { CssVarsThemeOptions, ColorSystemOptions } from './extendTheme';
import type { Theme, RuntimeColorSystem } from './types';
import { createSoftInversion, createSolidInversion } from './variantUtils';

export const getThemeWithVars = (
  themeInput?: Omit<CssVarsThemeOptions, 'colorSchemes'> & ColorSystemOptions,
) => {
  const {
    colorSchemes,
    focus,
    fontFamily,
    fontSize,
    fontWeight,
    letterSpacing,
    lineHeight,
    radius,
    shadow,
    palette: paletteInput,
    colorInversion: colorInversionInput,
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

  const theme = {
    focus,
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
    vars: {
      focus,
      fontFamily,
      fontSize,
      fontWeight,
      letterSpacing,
      lineHeight,
      radius,
      shadow,
      palette,
    },
    getColorSchemeSelector: () => '&',
  } as unknown as Theme;

  theme.colorInversion = deepmerge(
    {
      soft: createSoftInversion(theme),
      solid: createSolidInversion(theme),
    },
    colorInversionInput,
  );
  return theme;
};

const defaultTheme = getThemeWithVars();

export default defaultTheme;
