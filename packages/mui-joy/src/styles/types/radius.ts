import * as CSS from 'csstype';

type CSSProperties = CSS.Properties<number | string>;

export interface Radius {
  xs: CSSProperties['borderRadius'];
  sm: CSSProperties['borderRadius'];
  md: CSSProperties['borderRadius'];
  lg: CSSProperties['borderRadius'];
  xl: CSSProperties['borderRadius'];
}

export type RadiusProp = keyof Radius;
