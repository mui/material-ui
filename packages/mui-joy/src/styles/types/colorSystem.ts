import { OverridableStringUnion, Simplify } from '@mui/types';

type OverridableRecord<DefaultRecord extends { [k: string]: any }, Overrides = {}> = {
  [k in OverridableStringUnion<
    Exclude<keyof DefaultRecord, symbol>,
    Overrides
  >]: k extends keyof DefaultRecord ? DefaultRecord[k] : never;
};

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
export interface DefaultPaletteRange extends DefaultPaletteVariant {
  '50': string;
  '100': string;
  '200': string;
  '300': string;
  '400': string;
  '500': string;
  '600': string;
  '700': string;
  '800': string;
  '900': string;
  mainChannel: string;
  lightChannel: string;
  darkChannel: string;
}
export interface PaletteRange
  extends OverridableRecord<DefaultPaletteRange, PaletteRangeOverrides> {}

interface DefaultPaletteCommon {
  white: string;
  black: string;
}
export interface PaletteCommonOverrides {}
export interface PaletteCommon
  extends OverridableRecord<DefaultPaletteCommon, PaletteCommonOverrides> {}

interface DefaultPaletteText {
  primary: string;
  secondary: string;
  tertiary: string;
}
export interface PaletteTextOverrides {}
export interface PaletteText extends OverridableRecord<DefaultPaletteText, PaletteTextOverrides> {}

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
  extends OverridableRecord<DefaultPaletteBackground, PaletteBackgroundOverrides> {}

export interface ColorPalettePropOverrides {}

export type DefaultColorPalette = 'primary' | 'neutral' | 'danger' | 'info' | 'success' | 'warning';

export type ColorPaletteProp = OverridableStringUnion<
  DefaultColorPalette,
  ColorPalettePropOverrides
>;

// Split interfaces into multiple chunks so that they can be augmented independently

export interface PalettePrimaryOverrides {}

export interface PaletteNeutralOverrides {}

export interface PaletteDangerOverrides {}

export interface PaletteInfoOverrides {}

export interface PaletteSuccessOverrides {}

export interface PaletteWarningOverrides {}

export interface PalettePrimary
  extends OverridableRecord<DefaultPaletteRange, PalettePrimaryOverrides> {}
export interface PaletteNeutral
  extends OverridableRecord<
    DefaultPaletteRange & {
      plainHoverColor: string;
      outlinedHoverColor: string;
      softHoverColor: string;
    },
    PaletteNeutralOverrides
  > {}
export interface PaletteDanger
  extends OverridableRecord<DefaultPaletteRange, PaletteDangerOverrides> {}
export interface PaletteInfo extends OverridableRecord<DefaultPaletteRange, PaletteInfoOverrides> {}
export interface PaletteSuccess
  extends OverridableRecord<DefaultPaletteRange, PaletteSuccessOverrides> {}
export interface PaletteWarning
  extends OverridableRecord<DefaultPaletteRange, PaletteWarningOverrides> {}

export interface PaletteOverrides {}
export interface Palette
  extends OverridableRecord<
    {
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
    },
    PaletteOverrides
  > {
  mode: 'light' | 'dark';
}

export interface ColorSystem {
  palette: Palette;
  shadowRing: string;
  shadowChannel: string;
}

export interface PaletteOptions extends Palette {
  primary: DefaultPaletteRange & PaletteVariant;
  neutral: DefaultPaletteRange & PaletteVariant;
  danger: DefaultPaletteRange & PaletteVariant;
  info: DefaultPaletteRange & PaletteVariant;
  success: DefaultPaletteRange & PaletteVariant;
  warning: DefaultPaletteRange & PaletteVariant;
  background: DefaultPaletteBackground;
  common: DefaultPaletteCommon;
  text: DefaultPaletteText;
}

export type ApplyColorInversion<T extends { color?: ColorPaletteProp | 'inherit' }> = Simplify<
  Omit<T, 'color'> & {
    color: T['color'] | 'context';
  }
>;
