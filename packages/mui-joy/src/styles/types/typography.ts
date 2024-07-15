import { CSSObject } from '@mui/system';
import { MergeDefault, OverridableRecord } from './utils';

export interface DefaultFontSize {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xl2: string;
  xl3: string;
  xl4: string;
}
export interface FontSizeOverrides {}
export interface FontSize extends OverridableRecord<DefaultFontSize, FontSizeOverrides, string> {}

export interface DefaultFontFamily {
  body: string;
  display: string;
  code: string;
  fallback: string;
}
export interface FontFamilyOverrides {}
export interface FontFamily
  extends OverridableRecord<DefaultFontFamily, FontFamilyOverrides, string> {}

export interface DefaultFontWeight {
  xs: string | number;
  sm: string | number;
  md: string | number;
  lg: string | number;
  xl: string | number;
}
export interface FontWeightOverrides {}
export interface FontWeight
  extends OverridableRecord<DefaultFontWeight, FontWeightOverrides, string | number> {}

export interface DefaultLineHeight {
  xs: string | number;
  sm: string | number;
  md: string | number;
  lg: string | number;
  xl: string | number;
}
export interface LineHeightOverrides {}
export interface LineHeight
  extends OverridableRecord<DefaultLineHeight, LineHeightOverrides, string | number> {}

export interface DefaultTypographySystem {
  h1: CSSObject;
  h2: CSSObject;
  h3: CSSObject;
  h4: CSSObject;
  'title-lg': CSSObject;
  'title-md': CSSObject;
  'title-sm': CSSObject;
  'body-lg': CSSObject;
  'body-md': CSSObject;
  'body-sm': CSSObject;
  'body-xs': CSSObject;
}
export interface TypographySystemOverrides {}
export interface TypographySystem
  extends OverridableRecord<DefaultTypographySystem, TypographySystemOverrides, CSSObject> {}
export type TypographySystemOptions = MergeDefault<TypographySystem, DefaultTypographySystem>;
