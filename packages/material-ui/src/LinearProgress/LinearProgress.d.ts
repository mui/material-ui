import * as React from 'react';
import { InternalStandardProps as StandardProps } from '..';

export interface LinearProgressProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    root?: string;
    colorPrimary?: string;
    colorSecondary?: string;
    determinate?: string;
    indeterminate?: string;
    buffer?: string;
    query?: string;
    dashed?: string;
    dashedColorPrimary?: string;
    dashedColorSecondary?: string;
    bar?: string;
    barColorPrimary?: string;
    barColorSecondary?: string;
    bar1Indeterminate?: string;
    bar1Determinate?: string;
    bar1Buffer?: string;
    bar2Indeterminate?: string;
    bar2Buffer?: string;
  };
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'primary'
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
   * @default 'indeterminate'
   */
  variant?: 'determinate' | 'indeterminate' | 'buffer' | 'query';
}

export type LinearProgressClassKey = keyof NonNullable<LinearProgressProps['classes']>;

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
