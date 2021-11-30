import * as CSS from 'csstype';

type CSSProperties = CSS.Properties<number | string>;

export interface Elevation {
  xs: CSSProperties['boxShadow'];
  sm: CSSProperties['boxShadow'];
  md: CSSProperties['boxShadow'];
  lg: CSSProperties['boxShadow'];
  xl: CSSProperties['boxShadow'];
}

export type ElevationProp = keyof Elevation;
