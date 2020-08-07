import * as React from 'react';
import { StyledComponentProps } from '@material-ui/core/styles';

export interface CssBaselineProps extends StyledComponentProps<never> {
  /**
   * You can wrap a node.
   */
  children?: React.ReactNode;
}

/**
 * @deprecated The name of this type is misleading. `CssBaseline` implements no class at all.
 */
export type CssBaselineClassKey = '@global';

/**
 * Kickstart an elegant, consistent, and simple baseline to build upon.
 * Demos:
 *
 * - [Css Baseline](https://material-ui.com/components/css-baseline/)
 *
 * API:
 *
 * - [CssBaseline API](https://material-ui.com/api/css-baseline/)
 */
export default function CssBaseline(props: CssBaselineProps): JSX.Element;
