import { OverridableStringUnion, Simplify } from '@mui/types';
import { MergeDefault, OverridableRecord, OverridableImplicitRecord } from './utils';

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
  extends Record<
    `${DefaultVariant}${DefaultProperty}` | `${DefaultVariant}${DefaultState}${DefaultProperty}`,
    string
  > {}

export interface PaletteRangeOverrides {}
export interface DefaultPaletteRange extends DefaultPaletteVariant {
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
  mainChannel: string;
  lightChannel: string;
  darkChannel: string;
}
export interface PaletteRange
  extends OverridableRecord<DefaultPaletteRange, PaletteRangeOverrides, string> {}

interface DefaultPaletteCommon {
  white: string;
  black: string;
}
export interface PaletteCommonOverrides {}
export interface PaletteCommon
  extends OverridableRecord<DefaultPaletteCommon, PaletteCommonOverrides, string> {}

interface DefaultPaletteText {
  primary: string;
  secondary: string;
  tertiary: string;
  icon: string;
}
export interface PaletteTextOverrides {}
export interface PaletteText
  extends OverridableRecord<DefaultPaletteText, PaletteTextOverrides, string> {}

interface DefaultPaletteBackground {
  body: string;
  surface: string;
  popup: string;
  level1: string;
  level2: string;
  level3: string;
  tooltip: string;
  backdrop: string;
}
export interface PaletteBackgroundOverrides {}
export interface PaletteBackground
  extends OverridableRecord<DefaultPaletteBackground, PaletteBackgroundOverrides, string> {}

export interface ColorPalettePropOverrides {}

export type DefaultColorPalette = 'primary' | 'neutral' | 'danger' | 'success' | 'warning';

export type ColorPaletteProp = OverridableStringUnion<
  DefaultColorPalette,
  ColorPalettePropOverrides
>;

// Split interfaces into multiple chunks so that they can be augmented independently

export interface PalettePrimaryOverrides {}

export interface PalettePrimary
  extends OverridableRecord<PaletteRange, PalettePrimaryOverrides, string> {}

export interface PaletteNeutralOverrides {}
export interface PaletteNeutral
  extends OverridableRecord<
    PaletteRange & {
      plainHoverColor: string;
      outlinedHoverColor: string;
      softHoverColor: string;
    },
    PaletteNeutralOverrides,
    string
  > {}

export interface PaletteDangerOverrides {}
export interface PaletteDanger
  extends OverridableRecord<PaletteRange, PaletteDangerOverrides, string> {}

export interface PaletteSuccessOverrides {}
export interface PaletteSuccess
  extends OverridableRecord<PaletteRange, PaletteSuccessOverrides, string> {}

export interface PaletteWarningOverrides {}
export interface PaletteWarning
  extends OverridableRecord<PaletteRange, PaletteWarningOverrides, string> {}

export interface PaletteOverrides {}
export interface Palette
  extends OverridableImplicitRecord<
    {
      primary: PalettePrimary;
      neutral: PaletteNeutral;
      danger: PaletteDanger;
      success: PaletteSuccess;
      warning: PaletteWarning;
      common: PaletteCommon;
      text: PaletteText;
      background: PaletteBackground;
      divider: string;
      focusVisible: string;
    },
    PaletteOverrides
  > {
  mode: 'light' | 'dark';
}

export type PaletteOptions = MergeDefault<
  Palette,
  {
    primary: DefaultPaletteRange & PaletteVariant;
    neutral: DefaultPaletteRange & PaletteVariant;
    danger: DefaultPaletteRange & PaletteVariant;
    success: DefaultPaletteRange & PaletteVariant;
    warning: DefaultPaletteRange & PaletteVariant;
    background: DefaultPaletteBackground;
    common: DefaultPaletteCommon;
    text: DefaultPaletteText;
  }
>;

export interface ColorSystem {
  palette: Palette;
  shadowRing: string;
  shadowChannel: string;
}

export type ApplyColorInversion<T extends { color?: ColorPaletteProp | 'inherit' }> = Simplify<T>;
