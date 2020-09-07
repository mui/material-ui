import * as React from 'react';
import { InternalStandardProps as StandardProps } from '..';

export interface LinearProgressProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    /** Styles applied to the root element. */
    root?: string;
    /** Styles applied to the root and bar2 element if `color="primary"`; bar2 if `variant="buffer"`. */
    colorPrimary?: string;
    /** Styles applied to the root and bar2 elements if `color="secondary"`; bar2 if `variant="buffer"`. */
    colorSecondary?: string;
    /** Styles applied to the root element if `variant="determinate"`. */
    determinate?: string;
    /** Styles applied to the root element if `variant="indeterminate"`. */
    indeterminate?: string;
    /** Styles applied to the root element if `variant="buffer"`. */
    buffer?: string;
    /** Styles applied to the root element if `variant="query"`. */
    query?: string;
    /** Styles applied to the additional bar element if `variant="buffer"`. */
    dashed?: string;
    /** Styles applied to the additional bar element if `variant="buffer"` and `color="primary"`. */
    dashedColorPrimary?: string;
    /** Styles applied to the additional bar element if `variant="buffer"` and `color="secondary"`. */
    dashedColorSecondary?: string;
    /** Styles applied to the layered bar1 and bar2 elements. */
    bar?: string;
    /** Styles applied to the bar elements if `color="primary"`; bar2 if `variant` not "buffer". */
    barColorPrimary?: string;
    /** Styles applied to the bar elements if `color="secondary"`; bar2 if `variant` not "buffer". */
    barColorSecondary?: string;
    /** Styles applied to the bar1 element if `variant="indeterminate or query"`. */
    bar1Indeterminate?: string;
    /** Styles applied to the bar1 element if `variant="determinate"`. */
    bar1Determinate?: string;
    /** Styles applied to the bar1 element if `variant="buffer"`. */
    bar1Buffer?: string;
    /** Styles applied to the bar2 element if `variant="indeterminate or query"`. */
    bar2Indeterminate?: string;
    /** Styles applied to the bar2 element if `variant="buffer"`. */
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
