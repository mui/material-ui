import { deepmerge } from '@mui/utils';
import extendTheme from './extendTheme';
import type { CssVarsThemeOptions, ColorSystemOptions } from './extendTheme';
import type { Theme, RuntimeColorSystem } from './types';
import {
  createVariant,
  createPlainOverride,
  createSoftOverride,
  createSolidOverride,
} from './variantUtils';

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
defaultTheme.variantOverrides = deepmerge(
  {
    plain: createPlainOverride(defaultTheme),
    outlined: createPlainOverride(defaultTheme),
    soft: createSoftOverride(defaultTheme),
    solid: createSolidOverride(defaultTheme),
  },
  defaultTheme.variantOverrides,
);

export default defaultTheme;
