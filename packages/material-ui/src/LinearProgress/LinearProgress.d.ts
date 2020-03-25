import * as React from 'react';
import { StandardProps } from '..';

export interface LinearProgressProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, LinearProgressClassKey, 'children'> {
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color?: 'primary' | 'secondary';
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value?: number;
  /**
   * The value for the buffer variant.
   * Value between 0 and 100.
   */
  valueBuffer?: number;
  /**
   * The variant to use.
   * Use indeterminate or query when there is no progress value.
   */
  variant?: 'determinate' | 'indeterminate' | 'buffer' | 'query';
}

export type LinearProgressClassKey =
  | 'root'
  | 'colorPrimary'
  | 'colorSecondary'
  | 'determinate'
  | 'indeterminate'
  | 'buffer'
  | 'query'
  | 'dashed'
  | 'dashedColorPrimary'
  | 'dashedColorSecondary'
  | 'bar'
  | 'barColorPrimary'
  | 'barColorSecondary'
  | 'bar1Indeterminate'
  | 'bar2Indeterminate'
  | 'bar1Determinate'
  | 'bar1Buffer'
  | 'bar2Buffer';

/**
 * ## ARIA
 *
 * If the progress bar is describing the loading progress of a particular region of a page,
 * you should use `aria-describedby` to point to the progress bar, and set the `aria-busy`
 * attribute to `true` on that region until it has finished loading.
 * Demos:
 *
 * - [Progress](https://material-ui.com/components/progress/)
 *
 * API:
 *
 * - [LinearProgress API](https://material-ui.com/api/linear-progress/)
 */
export default function LinearProgress(props: LinearProgressProps): JSX.Element;
