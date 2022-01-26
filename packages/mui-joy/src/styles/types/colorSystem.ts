import { OverridableStringUnion } from '@mui/types';

/**
 * ====================================================
 * Developer facing types, they can augment these types.
 * ====================================================
 */
export interface PaletteVariant {
  textColor: string;
  // hover state
  textHoverColor: string;
  textHoverBg: string;
  // active state
  textActiveColor: string;
  textActiveBg: string;
  // disabled state
  textDisabledColor: string;

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
  lightBg: string;
  // hover state
  lightHoverColor: string;
  lightHoverBg: string;
  // active state
  lightActiveColor: string;
  lightActiveBg: string;
  // disabled state
  lightDisabledColor: string;
  lightDisabledBg: string;

  containedColor: string;
  containedBg: string;
  // hover state
  containedHoverColor: string;
  containedHoverBg: string;
  // active state
  containedActiveColor: string;
  containedActiveBg: string;
  // disabled state
  containedDisabledColor: string;
  containedDisabledBg: string;
}
export interface PaletteRange extends PaletteVariant {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

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

export type ColorPalette = {
  [k in Exclude<ColorPaletteProp, 'context'>]: PaletteRange;
};

export interface Palette extends ColorPalette {
  text: PaletteText;
  background: PaletteBackground;
  focusVisible: string;
}

export interface ColorSystem {
  palette: Palette;
  shadowRing: string;
  shadowChannel: string;
}
