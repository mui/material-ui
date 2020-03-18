import * as React from 'react';
import { StandardProps } from '..';
import { PaperProps } from '../Paper';

export interface SnackbarContentProps extends StandardProps<PaperProps, SnackbarContentClassKey> {
  action?: React.ReactNode;
  message?: React.ReactNode;
}

export type SnackbarContentClassKey = 'root' | 'message' | 'action';

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
declare const SnackbarContent: React.ComponentType<SnackbarContentProps>;

export default SnackbarContent;
