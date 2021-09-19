import * as React from 'react';
import { StyledComponentProps } from '@mui/material/styles';

export interface CssBaselineProps extends StyledComponentProps<never> {
  /**
   * You can wrap a node.
   */
  children?: React.ReactNode;
}

/**
 * Kickstart an elegant, consistent, and simple baseline to build upon.
 *
 * Demos:
 *
 * - [Css Baseline](https://mui.com/components/css-baseline/)
 *
 * API:
 *
 * - [CssBaseline API](https://mui.com/api/css-baseline/)
 */
export default function CssBaseline(props: CssBaselineProps): JSX.Element;
