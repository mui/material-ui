import { OverridableStringUnion, Simplify } from '@mui/types';

/**
 * ====================================================
 * Developer facing types, they can augment these types.
 * ====================================================
 */
interface DefaultPaletteVariant {
  plainColor: string;
  plainHoverBg: string;
  plainActiveBg: string;
  plainDisabledColor: string;

  outlinedColor: string;
  outlinedBorder: string;
  outlinedHoverBg: string;
  outlinedHoverBorder: string;
  outlinedActiveBg: string;
  outlinedDisabledColor: string;
  outlinedDisabledBorder: string;

  softColor: string;
  softBg: string;
  softHoverBg: string;
  softActiveBg: string;
  softDisabledColor: string;
  softDisabledBg: string;

  solidColor: string;
  solidBg: string;
  solidHoverBg: string;
  solidActiveBg: string;
  solidDisabledColor: string;
  solidDisabledBg: string;
}

type DefaultVariant = 'plain' | 'outlined' | 'soft' | 'solid';
type DefaultState = 'Hover' | 'Active' | 'Disabled';
type DefaultProperty = 'Color' | 'Bg' | 'Border';

export interface PaletteVariant
  extends Record<`${DefaultVariant}${DefaultState}${DefaultProperty}`, string> {}

export interface PaletteRangeOverrides {}
export type DefaultPaletteRange = OverridableStringUnion<
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
  | 'darkChannel'
  | keyof DefaultPaletteVariant,
  PaletteRangeOverrides
>;

export interface PaletteRange extends Record<DefaultPaletteRange, string>, PaletteVariant {}

export interface PaletteCommon {
  white: string;
  black: string;
}

export interface PaletteTextOverrides {}
type DefaultPaletteText = OverridableStringUnion<
  'primary' | 'secondary' | 'tertiary',
  PaletteTextOverrides
>;
export interface PaletteText extends Record<DefaultPaletteText, string> {}

export interface PaletteBackgroundOverrides {}
type DefaultPaletteBackground = OverridableStringUnion<
  'body' | 'surface' | 'popup' | 'level1' | 'level2' | 'level3' | 'tooltip' | 'backdrop',
  PaletteBackgroundOverrides
>;
export interface PaletteBackground extends Record<DefaultPaletteBackground, string> {}

export interface ColorPalettePropOverrides {}

export type DefaultColorPalette = 'primary' | 'neutral' | 'danger' | 'info' | 'success' | 'warning';

export type ColorPaletteProp = OverridableStringUnion<
  DefaultColorPalette,
  ColorPalettePropOverrides
>;

// Split interfaces into multiple chunks so that they can be augmented independently

export interface PalettePrimaryOverrides {}
type DefaultPalettePrimary = OverridableStringUnion<DefaultPaletteRange, PalettePrimaryOverrides>;

export interface PaletteNeutralOverrides {}
type DefaultPaletteNeutral = OverridableStringUnion<
  DefaultPaletteRange | 'plainHoverColor' | 'outlinedHoverColor' | 'softHoverColor',
  PaletteNeutralOverrides
>;

export interface PaletteDangerOverrides {}
type DefaultPaletteDanger = OverridableStringUnion<DefaultPaletteRange, PaletteDangerOverrides>;

export interface PaletteInfoOverrides {}
type DefaultPaletteInfo = OverridableStringUnion<DefaultPaletteRange, PaletteInfoOverrides>;

export interface PaletteSuccessOverrides {}
type DefaultPaletteSuccess = OverridableStringUnion<DefaultPaletteRange, PaletteSuccessOverrides>;

export interface PaletteWarningOverrides {}
type DefaultPaletteWarning = OverridableStringUnion<DefaultPaletteRange, PaletteWarningOverrides>;

export interface PalettePrimary extends Record<DefaultPalettePrimary, string> {}
export interface PaletteNeutral extends Record<DefaultPaletteNeutral, string> {}
export interface PaletteDanger extends Record<DefaultPaletteDanger, string> {}
export interface PaletteInfo extends Record<DefaultPaletteInfo, string> {}
export interface PaletteSuccess extends Record<DefaultPaletteSuccess, string> {}
export interface PaletteWarning extends Record<DefaultPaletteWarning, string> {}

export interface Palette {
  mode: 'light' | 'dark';
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

export interface PaletteOptions extends Palette {
  primary: PalettePrimary & PaletteVariant;
  neutral: PaletteNeutral & PaletteVariant;
  danger: PaletteDanger & PaletteVariant;
  info: PaletteInfo & PaletteVariant;
  success: PaletteSuccess & PaletteVariant;
  warning: PaletteWarning & PaletteVariant;
}

export type ApplyColorInversion<T extends { color?: ColorPaletteProp | 'inherit' }> = Simplify<
  Omit<T, 'color'> & {
    color: T['color'] | 'context';
  }
>;
