import * as CSS from 'csstype';

type CSSProperties = CSS.Properties<number | string>;

export interface BorderRadius {
  default: CSSProperties['borderRadius'];
  xs: CSSProperties['borderRadius'];
  sm: CSSProperties['borderRadius'];
  md: CSSProperties['borderRadius'];
  lg: CSSProperties['borderRadius'];
  xl: CSSProperties['borderRadius'];
}

export type RoundnessProp = keyof BorderRadius;
