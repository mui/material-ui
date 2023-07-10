import { CSSObject } from '@mui/system';
import { MergeDefault, OverridableRecord } from './utils';

export interface DefaultFontSize {
  xs3: string;
  xs2: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xl2: string;
  xl3: string;
  xl4: string;
  xl5: string;
  xl6: string;
  xl7: string;
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
  xl2: string | number;
  xl3: string | number;
}
export interface FontWeightOverrides {}
export interface FontWeight
  extends OverridableRecord<DefaultFontWeight, FontWeightOverrides, string | number> {}

export interface DefaultLineHeight {
  sm: string | number;
  md: string | number;
  lg: string | number;
}
export interface LineHeightOverrides {}
export interface LineHeight
  extends OverridableRecord<DefaultLineHeight, LineHeightOverrides, string | number> {}

export interface DefaultLetterSpacing {
  sm: string;
  md: string;
  lg: string;
}
export interface LetterSpacingOverrides {}
export interface LetterSpacing
  extends OverridableRecord<DefaultLetterSpacing, LetterSpacingOverrides, string> {}

export interface DefaultTypographySystem {
  display1: CSSObject;
  display2: CSSObject;
  h1: CSSObject;
  h2: CSSObject;
  h3: CSSObject;
  h4: CSSObject;
  h5: CSSObject;
  h6: CSSObject;
  body1: CSSObject;
  body2: CSSObject;
  body3: CSSObject;
  body4: CSSObject;
  body5: CSSObject;
}
export interface TypographySystemOverrides {}
export interface TypographySystem
  extends OverridableRecord<DefaultTypographySystem, TypographySystemOverrides, CSSObject> {}
export type TypographySystemOptions = MergeDefault<TypographySystem, DefaultTypographySystem>;
