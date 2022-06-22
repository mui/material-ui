import * as React from 'react';
import { StyledComponentProps } from '../styles';

export interface CssBaselineProps extends StyledComponentProps<never> {
  /**
   * You can wrap a node.
   */
  children?: React.ReactNode;
  /**
   * Enable `color-scheme` CSS property to use `theme.palette.mode`.
   * For more details, check out https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme
   * For browser support, check out https://caniuse.com/?search=color-scheme
   * @default false
   */
  enableColorScheme?: boolean;
}

/**
 * Kickstart an elegant, consistent, and simple baseline to build upon.
 *
 * Demos:
 *
 * - [Css baseline](https://mui.com/material-ui/react-css-baseline/)
 *
 * API:
 *
 * - [CssBaseline API](https://mui.com/material-ui/api/css-baseline/)
 */
export default function CssBaseline(props: CssBaselineProps): JSX.Element;
