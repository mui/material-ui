import * as React from 'react';
import { StandardProps } from '..';
import { PaperProps } from '../Paper';

export interface SnackbarContentProps
  extends StandardProps<PaperProps, SnackbarContentClassKey, 'children'> {
  /**
   * The action to display. It renders after the message, at the end of the snackbar.
   */
  action?: React.ReactNode;
  /**
   * The message to display.
   */
  message?: React.ReactNode;
  /**
   * The ARIA role attribute of the element.
   */
  role?: PaperProps['role'];
}

export type SnackbarContentClassKey = 'root' | 'message' | 'action';

/**
 *
 * Demos:
 *
 * - [Snackbars](https://mui.com/components/snackbars/)
 *
 * API:
 *
 * - [SnackbarContent API](https://mui.com/api/snackbar-content/)
 * - inherits [Paper API](https://mui.com/api/paper/)
 */
export default function SnackbarContent(props: SnackbarContentProps): JSX.Element;
