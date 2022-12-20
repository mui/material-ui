import { CSSObject } from '@mui/system';
import { OverridableStringUnion } from '@mui/types';

export interface FontSize {
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

export interface FontFamily {
  body: string;
  display: string;
  code: string;
  fallback: string;
}

export interface FontWeight {
  xs: string | number;
  sm: string | number;
  md: string | number;
  lg: string | number;
  xl: string | number;
  xl2: string | number;
  xl3: string | number;
}

export interface LineHeight {
  sm: string | number;
  md: string | number;
  lg: string | number;
}

export interface LetterSpacing {
  sm: string;
  md: string;
  lg: string;
}

export interface TypographySystemOverrides {}
export type ExtendedTypographySystem = OverridableStringUnion<
  | 'display1'
  | 'display2'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body1'
  | 'body2'
  | 'body3'
  | 'body4'
  | 'body5',
  TypographySystemOverrides
>;

export interface TypographySystem extends Record<ExtendedTypographySystem, CSSObject> {}
