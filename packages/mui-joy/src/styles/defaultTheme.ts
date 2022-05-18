import { deepmerge } from '@mui/utils';
import extendTheme from './extendTheme';
import type { ThemeInput, ColorSystemInput } from './extendTheme';
import type { Theme, RuntimeColorSystem } from './types';
import { createVariant, createTextOverrides, createContainedOverrides } from './variantUtils';

export const getThemeWithVars = (
  themeInput?: Omit<ThemeInput, 'colorSchemes'> & ColorSystemInput,
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

  const defaultTheme = {
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

      // variant overrides
      plainOverrides: createTextOverrides(defaultTheme),
      outlinedOverrides: createTextOverrides(defaultTheme),
      softOverrides: createTextOverrides(defaultTheme),
      solidOverrides: createContainedOverrides(defaultTheme),
    },
    defaultTheme.variants,
  );
  return defaultTheme;
};

const defaultTheme = getThemeWithVars();

export default defaultTheme;
