import * as React from 'react';
import { InternalStandardProps as StandardProps } from '..';
import { PaperProps } from '../Paper';

export interface SnackbarContentProps extends StandardProps<PaperProps, 'children'> {
  /**
   * The action to display. It renders after the message, at the end of the snackbar.
   */
  action?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    root?: string;
    message?: string;
    action?: string;
  };
  /**
   * The message to display.
   */
  message?: React.ReactNode;
  /**
   * The ARIA role attribute of the element.
   * @default 'alert'
   */
  role?: PaperProps['role'];
}

export type SnackbarContentClassKey = keyof NonNullable<SnackbarContentProps['classes']>;

/**
 *
 * Demos:
 *
 * - [Snackbars](https://material-ui.com/components/snackbars/)
 *
 * API:
 *
 * - [SnackbarContent API](https://material-ui.com/api/snackbar-content/)
 * - inherits [Paper API](https://material-ui.com/api/paper/)
 */
export default function SnackbarContent(props: SnackbarContentProps): JSX.Element;
