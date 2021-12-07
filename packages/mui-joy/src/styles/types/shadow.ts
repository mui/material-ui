import * as CSS from 'csstype';

type CSSProperties = CSS.Properties<number | string>;

export interface Shadow {
  xs: CSSProperties['boxShadow'];
  sm: CSSProperties['boxShadow'];
  md: CSSProperties['boxShadow'];
  lg: CSSProperties['boxShadow'];
  xl: CSSProperties['boxShadow'];
}

export type ShadowProp = keyof Shadow;
