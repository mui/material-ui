import * as React from 'react';
import { StandardProps } from '..';

export type ScopedCssBaselineClassKey = 'root';

export interface ScopedCssBaselineProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, ScopedCssBaselineClassKey> {}

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
