import * as React from 'react';
import { StandardProps } from '@material-ui/core';

export interface AlertTitleProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, AlertTitleClassKey> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
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
