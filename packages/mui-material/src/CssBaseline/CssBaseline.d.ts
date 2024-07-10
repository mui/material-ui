import * as React from 'react';
import { StyledComponentProps } from '../styles';

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
 * - [CSS Baseline](https://next.mui.com/material-ui/react-css-baseline/)
 *
 * API:
 *
 * - [CssBaseline API](https://next.mui.com/material-ui/api/css-baseline/)
 */
export default function CssBaseline(props: CssBaselineProps): React.JSX.Element;
