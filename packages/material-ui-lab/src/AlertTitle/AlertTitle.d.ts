import * as React from 'react';
import { InternalStandardProps as StandardProps } from '@material-ui/core';

export interface AlertTitleProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes?: {
    /** Styles applied to the root element. */
    root?: string;
  };
}

export type AlertTitleClassKey = 'root';

/**
 *
 * Demos:
 *
 * - [Alert](https://material-ui.com/components/alert/)
 *
 * API:
 *
 * - [AlertTitle API](https://material-ui.com/api/alert-title/)
 */
export default function AlertTitle(props: AlertTitleProps): JSX.Element;
