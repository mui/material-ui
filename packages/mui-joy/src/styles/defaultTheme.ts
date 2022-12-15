import { deepmerge } from '@mui/utils';
import { unstable_styleFunctionSx as styleFunctionSx } from '@mui/system';
import extendTheme from './extendTheme';
import defaultSxConfig from './sxConfig';
import type { CssVarsThemeOptions, ColorSystemOptions } from './extendTheme';
import type { Theme, RuntimeColorSystem, SxProps } from './types';
import { createVariant, createSoftInversion, createSolidInversion } from './variantUtils';

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
};

const defaultTheme = getThemeWithVars();

defaultTheme.variants = deepmerge(
  {
    plain: createVariant('plain', defaultTheme),
    plainHover: createVariant('plainHover', defaultTheme),
    plainActive: createVariant('plainActive', defaultTheme),
    plainDisabled: createVariant('plainDisabled', defaultTheme),
    outlined: createVariant('outlined', defaultTheme),
    outlinedHover: createVariant('outlinedHover', defaultTheme),
    outlinedActive: createVariant('outlinedActive', defaultTheme),
    outlinedDisabled: createVariant('outlinedDisabled', defaultTheme),
    soft: createVariant('soft', defaultTheme),
    softHover: createVariant('softHover', defaultTheme),
    softActive: createVariant('softActive', defaultTheme),
    softDisabled: createVariant('softDisabled', defaultTheme),
    solid: createVariant('solid', defaultTheme),
    solidHover: createVariant('solidHover', defaultTheme),
    solidActive: createVariant('solidActive', defaultTheme),
    solidDisabled: createVariant('solidDisabled', defaultTheme),
  },
  defaultTheme.variants,
);
defaultTheme.colorInversion = deepmerge(
  {
    soft: createSoftInversion(defaultTheme),
    solid: createSolidInversion(defaultTheme),
  },
  defaultTheme.colorInversion,
);

defaultTheme.unstable_sxConfig = defaultSxConfig;
defaultTheme.unstable_sx = function sx(props: SxProps) {
  return styleFunctionSx({ sx: props, theme: this });
};

export default defaultTheme;
