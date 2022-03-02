import { OverridableStringUnion } from '@mui/types';

/**
 * ====================================================
 * Developer facing types, they can augment these types.
 * ====================================================
 */
export interface PaletteVariant {
  textColor: string;
  textBg: string;
  textBorder: string;
  // hover state
  textHoverColor: string;
  textHoverBorder: string;
  textHoverBg: string;
  // active state
  textActiveColor: string;
  textActiveBorder: string;
  textActiveBg: string;
  // disabled state
  textDisabledColor: string;
  textDisabledBorder: string;
  textDisabledBg: string;

  outlinedColor: string;
  outlinedBorder: string;
  outlinedBg: string;
  // hover state
  outlinedHoverColor: string;
  outlinedHoverBorder: string;
  outlinedHoverBg: string;
  // active state
  outlinedActiveColor: string;
  outlinedActiveBorder: string;
  outlinedActiveBg: string;
  // disabled state
  outlinedDisabledColor: string;
  outlinedDisabledBorder: string;
  outlinedDisabledBg: string;

  lightColor: string;
  lightBorder: string;
  lightBg: string;
  // hover state
  lightHoverColor: string;
  lightHoverBorder: string;
  lightHoverBg: string;
  // active state
  lightActiveColor: string;
  lightActiveBorder: string;
  lightActiveBg: string;
  // disabled state
  lightDisabledColor: string;
  lightDisabledBorder: string;
  lightDisabledBg: string;

  containedColor: string;
  containedBg: string;
  containedBorder: string;
  // hover state
  containedHoverColor: string;
  containedHoverBg: string;
  containedHoverBorder: string;
  // active state
  containedActiveColor: string;
  containedActiveBg: string;
  containedActiveBorder: string;
  // disabled state
  containedDisabledColor: string;
  containedDisabledBg: string;
  containedDisabledBorder: string;

  // override palette.text
  overrideTextPrimary: string;
  overrideTextSecondary: string;
  overrideTextTertiary: string;
}

export interface PaletteRangeOverrides {}
export type ExtendedPaletteRange = OverridableStringUnion<
  '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900',
  PaletteRangeOverrides
>;

export interface PaletteRange extends Record<ExtendedPaletteRange, string>, PaletteVariant {}

export interface PaletteText {
  primary: string;
  secondary: string;
  tertiary: string;
}
export interface PaletteBackground {
  body: string;
  level1: string;
  level2: string;
  level3: string;
}

export interface ColorPalettePropOverrides {}

export type DefaultColorPalette =
  | 'primary'
  | 'neutral'
  | 'danger'
  | 'info'
  | 'success'
  | 'warning'
  | 'context';

export type ColorPaletteProp = OverridableStringUnion<
  DefaultColorPalette,
  ColorPalettePropOverrides
>;

// Split interfaces into multiple chunks so that they can be augmented independently

export interface PalettePrimary extends PaletteRange {}
export interface PaletteNeutral extends PaletteRange {}
export interface PaletteDanger extends PaletteRange {}
export interface PaletteInfo extends PaletteRange {}
export interface PaletteSuccess extends PaletteRange {}
export interface PaletteWarning extends PaletteRange {}

export interface Palette {
  primary: PalettePrimary;
  neutral: PaletteNeutral;
  danger: PaletteDanger;
  info: PaletteInfo;
  success: PaletteSuccess;
  warning: PaletteWarning;
  text: PaletteText;
  background: PaletteBackground;
  divider: string;
  focusVisible: string;
}

export interface ColorSystem {
  palette: Palette;
  shadowRing: string;
  shadowChannel: string;
}
