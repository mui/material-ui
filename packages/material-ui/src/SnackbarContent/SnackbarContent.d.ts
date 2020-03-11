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
 *
 * Demos:
 * - {@link https://material-ui.com/components/snackbars Snackbars}
 *
 * API:
 * - {@link https://material-ui.com/api/SnackbarContent SnackbarContent API}
 * - inherits {@link https://material-ui.com/api//api/paper Paper API}
 */
declare const SnackbarContent: React.ComponentType<SnackbarContentProps>;

export default SnackbarContent;
