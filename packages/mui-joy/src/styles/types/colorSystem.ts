import { OverridableStringUnion } from '@mui/types';
import React from 'react';
/**
 * ====================================================
 * Developer facing types, they can augment these types.
 * ====================================================
 */

export interface PaletteVariant {
  textColor: string;
  textHoverBg: string;
  textActiveBg: string;
  textDisabledColor: string;

  outlinedColor: string;
  outlinedBorder: string;
  outlinedHoverBg: string;
  outlinedHoverBorder: string;
  outlinedActiveBg: string;
  outlinedDisabledColor: string;
  outlinedDisabledBorder: string;

  lightColor: string;
  lightBg: string;
  lightHoverBg: string;
  lightActiveBg: string;
  lightDisabledColor: string;
  lightDisabledBg: string;

  containedColor: string;
  containedBg: string;
  containedHoverBg: string;
  containedActiveBg: string;
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
  primary: React.CSSProperties['color'];
  secondary: React.CSSProperties['color'];
  tertiary: React.CSSProperties['color'];
}

export interface PaletteBackground {
  default: React.CSSProperties['backgroundColor'];
  level1: React.CSSProperties['backgroundColor'];
  level2: React.CSSProperties['backgroundColor'];
  level3: React.CSSProperties['backgroundColor'];
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
  focusVisible: React.CSSProperties['outline'];
}

export interface ColorSystem {
  palette: Palette;
  elevationRing: React.CSSProperties['boxShadow'];
  elevationChannel: string;
}
