import * as React from 'react';
import { StandardProps } from '..';

export interface CircularProgressProps
  extends StandardProps<
    React.HTMLAttributes<HTMLDivElement>,
    CircularProgressClassKey,
    'children'
  > {
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color?: 'primary' | 'secondary' | 'inherit';
  /**
   * If `true`, the shrink animation is disabled.
   * This only works if variant is `indeterminate`.
   */
  disableShrink?: boolean;
  /**
   * The size of the circle.
   * If using a number, the pixel unit is assumed.
   * If using a string, you need to provide the CSS unit, e.g '3rem'.
   */
  size?: number | string;
  /**
   * The thickness of the circle.
   */
  thickness?: number;
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   */
  value?: number;
  /**
   * The variant to use.
   * Use indeterminate when there is no progress value.
   */
  variant?: 'determinate' | 'indeterminate' | 'static';
}

export type CircularProgressClassKey =
  | 'root'
  | 'static'
  | 'determinate'
  | 'indeterminate'
  | 'colorPrimary'
  | 'colorSecondary'
  | 'svg'
  | 'circle'
  | 'circleStatic'
  | 'circleDeterminate'
  | 'circleIndeterminate'
  | 'circleDisableShrink';

/**
 * ## ARIA
 *
 * If the progress bar is describing the loading progress of a particular region of a page,
 * you should use `aria-describedby` to point to the progress bar, and set the `aria-busy`
 * attribute to `true` on that region until it has finished loading.
 * Demos:
 *
 * - [Progress](https://mui.com/components/progress/)
 *
 * API:
 *
 * - [CircularProgress API](https://mui.com/api/circular-progress/)
 */
export default function CircularProgress(props: CircularProgressProps): JSX.Element;
