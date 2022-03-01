import { CSSObject } from '@mui/system';
import { OverridableStringUnion } from '@mui/types';

export interface FontSize {
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
  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'body3',
  TypographySystemOverrides
>;

export interface TypographySystem extends Record<ExtendedTypographySystem, CSSObject> {}
