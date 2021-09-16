import * as React from 'react';
import { StandardProps } from '..';

export type ScopedCssBaselineClassKey = 'root';

export interface ScopedCssBaselineProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, ScopedCssBaselineClassKey> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
}

/**
 *
 * Demos:
 *
 * - [Css Baseline](https://mui.com/components/css-baseline/)
 *
 * API:
 *
 * - [ScopedCssBaseline API](https://mui.com/api/scoped-css-baseline/)
 */
export default function ScopedCssBaseline(props: ScopedCssBaselineProps): JSX.Element;
