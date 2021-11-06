import { OverridableStringUnion } from '@mui/types';
/**
 * ====================================================
 * Developer facing types, they can augment these types.
 * ====================================================
 */
export interface PaletteRange {
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
  btnTextColor?: string;
  btnTextHoverBg?: string;
  btnTextActiveBg?: string;
  btnTextFocusOutline?: string;
  btnTextDisabledColor?: string;
  btnOutlinedBorder?: string;
  btnOutlinedDisabledBorder?: string;
  btnContainedColor?: string;
  btnContainedBg?: string;
  btnContainedHoverBg?: string;
  btnContainedActiveBg?: string;
  btnContainedDisabledBg?: string;
  //
  btnChannelTextColor?: string;
  btnChannelTextBg?: string;
  btnChannelTextOutline?: string;
  btnChannelOutlinedBorder?: string;
  btnChannelContainedColor?: string;
  btnChannelContainedBg?: string;
}

export interface PaletteText {
  heading: React.CSSProperties['color'];
  headingIntro: React.CSSProperties['color'];
  content: React.CSSProperties['color'];
  detail: React.CSSProperties['color'];
  overline: React.CSSProperties['color'];
}

export interface PaletteBgNeutral {
  transparency: React.CSSProperties['backgroundColor'];
  plain: React.CSSProperties['backgroundColor'];
}

export interface ColorPalettePropOverrides {}

export type ColorPaletteProp = OverridableStringUnion<
  'brand' | 'neutral',
  ColorPalettePropOverrides
>;

export type ColorPalette = {
  [k in ColorPaletteProp]: PaletteRange;
};

export interface Palette extends ColorPalette {
  text: PaletteText;
  bgNeutral: PaletteBgNeutral;
}

export interface Opacity {
  hover: number;
  active: number;
  focus: number;
  disabled: number;
}

export interface ColorSystems {
  palette: Palette;
  opacity: Opacity;
}
