import * as React from 'react';
// eslint-disable-next-line no-restricted-imports
import { InternalStandardProps as StandardProps, PaperProps } from '@mui/material';
import { SnackbarContentClasses } from './snackbarContentClasses';

export interface SnackbarContentOwnerState extends SnackbarContentProps {}

// TODO v6: Add the 'sx' type after migrating the Paper Component.
export interface SnackbarContentProps extends StandardProps<PaperProps, 'children'> {
  /**
   * The action to display. It renders after the message, at the end of the snackbar.
   */
  action?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<SnackbarContentClasses>;
  /**
   * The message to display.
   */
  message?: React.ReactNode;
  /**
   * The ARIA role attribute of the element.
   * @default 'alert'
   */
  role?: React.AriaRole;
}
