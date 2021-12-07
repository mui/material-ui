import * as CSS from 'csstype';
import { CSSObject } from '@mui/system';

type CSSProperties = CSS.Properties<number | string>;

export interface FontSize {
  default: CSSProperties['fontSize'];
  xs: CSSProperties['fontSize'];
  sm: CSSProperties['fontSize'];
  md: CSSProperties['fontSize'];
  lg: CSSProperties['fontSize'];
  xl: CSSProperties['fontSize'];
  xl2: CSSProperties['fontSize'];
  xl3: CSSProperties['fontSize'];
  xl4: CSSProperties['fontSize'];
  xl5: CSSProperties['fontSize'];
  xl6: CSSProperties['fontSize'];
}

export interface FontFamily {
  default: CSSProperties['fontFamily'];
  display: CSSProperties['fontFamily'];
  code: CSSProperties['fontFamily'];
  fallback: CSSProperties['fontFamily'];
}

export interface FontWeight {
  // add string to support css variable value.
  default: CSSProperties['fontWeight'];
  xs: CSSProperties['fontWeight'];
  sm: CSSProperties['fontWeight'];
  md: CSSProperties['fontWeight'];
  lg: CSSProperties['fontWeight'];
  xl: CSSProperties['fontWeight'];
}

export interface LineHeight {
  default: CSSProperties['lineHeight'];
  sm: CSSProperties['lineHeight'];
  md: CSSProperties['lineHeight'];
  lg: CSSProperties['lineHeight'];
}

export interface LetterSpacing {
  default: CSSProperties['letterSpacing'];
  sm: CSSProperties['letterSpacing'];
  md: CSSProperties['letterSpacing'];
  lg: CSSProperties['letterSpacing'];
}

export interface TypographySystem {
  h1: CSSObject;
  h2: CSSObject;
  h3: CSSObject;
  h4: CSSObject;
  h5: CSSObject;
  h6: CSSObject;
  body1: CSSObject;
  body2: CSSObject;
  body3: CSSObject;
}
