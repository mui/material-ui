import { OverridableStringUnion } from '@mui/types';

/**
 * ====================================================
 * Developer facing types, they can augment these types.
 * ====================================================
 */
export interface PaletteVariant {
  plainColor: string;
  plainBg: string;
  plainBorder: string;
  // hover state
  plainHoverColor: string;
  plainHoverBorder: string;
  plainHoverBg: string;
  // active state
  plainActiveColor: string;
  plainActiveBorder: string;
  plainActiveBg: string;
  // disabled state
  plainDisabledColor: string;
  plainDisabledBorder: string;
  plainDisabledBg: string;

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

  softColor: string;
  softBorder: string;
  softBg: string;
  // hover state
  softHoverColor: string;
  softHoverBorder: string;
  softHoverBg: string;
  // active state
  softActiveColor: string;
  softActiveBorder: string;
  softActiveBg: string;
  // disabled state
  softDisabledColor: string;
  softDisabledBorder: string;
  softDisabledBg: string;

  solidColor: string;
  solidBg: string;
  solidBorder: string;
  // hover state
  solidHoverColor: string;
  solidHoverBg: string;
  solidHoverBorder: string;
  // active state
  solidActiveColor: string;
  solidActiveBg: string;
  solidActiveBorder: string;
  // disabled state
  solidDisabledColor: string;
  solidDisabledBg: string;
  solidDisabledBorder: string;

  // override palette.text
  overrideTextPrimary: string;
  overrideTextSecondary: string;
  overrideTextTertiary: string;
}

export interface PaletteRangeOverrides {}
export type ExtendedPaletteRange = OverridableStringUnion<
  | '50'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | 'mainChannel'
  | 'lightChannel'
  | 'darkChannel',
  PaletteRangeOverrides
>;

export interface PaletteRange extends Record<ExtendedPaletteRange, string>, PaletteVariant {}

export interface PaletteCommon {
  white: string;
  black: string;
}

export interface PaletteText {
  primary: string;
  secondary: string;
  tertiary: string;
}
export interface PaletteBackground {
  body: string;
  surface: string;
  level1: string;
  level2: string;
  level3: string;
  tooltip: string;
  backdrop: string;
}

export interface ColorPalettePropOverrides {}

export type DefaultColorPalette = 'primary' | 'neutral' | 'danger' | 'info' | 'success' | 'warning';

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
  common: PaletteCommon;
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
