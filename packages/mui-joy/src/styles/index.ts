// reexports from system for module augmentation
export type { BreakpointOverrides } from '@mui/system';

// Joy typings
export type { ColorSchemeOverrides, SupportedColorScheme } from './types/colorScheme';
export type {
  ColorSystem,
  ColorPalettePropOverrides,
  ColorPaletteProp,
  PaletteVariant,
  PaletteRangeOverrides,
  PaletteRange,
  PaletteText,
  PaletteBackground,
  PalettePrimary,
  PaletteNeutral,
  PaletteDanger,
  PaletteInfo,
  PaletteSuccess,
  PaletteWarning,
  Palette,
} from './types/colorSystem';
export type { Focus } from './types/focus';
export type { Radius } from './types/radius';
export type { Shadow } from './types/shadow';
export type {
  FontFamily,
  FontSize,
  FontWeight,
  LetterSpacing,
  LineHeight,
  TypographySystem,
  TypographySystemOverrides,
} from './types/typography';
export type { Components } from './components';
export type {
  VariantPlain,
  VariantPlainHover,
  VariantPlainActive,
  VariantPlainDisabled,
  VariantOutlined,
  VariantOutlinedHover,
  VariantOutlinedActive,
  VariantOutlinedDisabled,
  VariantSoft,
  VariantSoftHover,
  VariantSoftActive,
  VariantSoftDisabled,
  VariantSolid,
  VariantSolidHover,
  VariantSolidActive,
  VariantSolidDisabled,
  VariantPropOverrides,
  Variants,
  VariantProp,
} from './types/variants';
export type { Theme, ThemeVars, ThemeScales, ThemeCSSVar } from './types/theme';
export {
  CssVarsProvider,
  useColorScheme,
  getInitColorSchemeScript,
  shouldSkipGeneratingVar,
} from './CssVarsProvider';
export { default as styled } from './styled';
export { default as ThemeProvider } from './ThemeProvider';
export * from './ThemeProvider';
export { default as useThemeProps } from './useThemeProps';
export { sx as experimental_sx } from './styleFunctionSx';
export { default as extendTheme, createGetCssVar } from './extendTheme';
export type { CssVarsThemeOptions } from './extendTheme';
export { default as StyledEngineProvider } from './StyledEngineProvider';
