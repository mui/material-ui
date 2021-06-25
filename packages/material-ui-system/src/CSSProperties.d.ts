import * as CSS from 'csstype';

/**
 * All non-vendor-prefixed CSS properties. (Also allows `number` in order to support CSS-in-JS libs,
 * since they are converted to `px`.)
 */
export interface CSSProperties
  extends CSS.StandardProperties<number | string>,
    CSS.SvgProperties<number | string> {}
