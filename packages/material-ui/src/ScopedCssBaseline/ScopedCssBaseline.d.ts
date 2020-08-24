import * as React from 'react';
import { InternalStandardProps as StandardProps } from '..';

export type ScopedCssBaselineClassKey = keyof NonNullable<ScopedCssBaselineProps['classes']>;

export interface ScopedCssBaselineProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    /** Styles applied to the root element. */
    root?: string;
  };
}

/**
 *
 * Demos:
 *
 * - [Css Baseline](https://material-ui.com/components/css-baseline/)
 *
 * API:
 *
 * - [ScopedCssBaseline API](https://material-ui.com/api/scoped-css-baseline/)
 */
export default function ScopedCssBaseline(props: ScopedCssBaselineProps): JSX.Element;
