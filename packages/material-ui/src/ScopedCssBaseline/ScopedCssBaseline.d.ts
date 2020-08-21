import * as React from 'react';
import { StandardProps } from '..';

export type ScopedCssBaselineClassKey = 'root';

export interface ScopedCssBaselineProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, ScopedCssBaselineClassKey> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * See [CSS API](#css) below for more details.
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
