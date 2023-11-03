import * as React from 'react';
import { SxProps } from '@mui/system';
import { InternalStandardProps as StandardProps, PaperProps, Theme } from '@mui/material';
import { SnackbarContentClasses } from './snackbarContentClasses';

export interface SnackbarContentOwnerState extends SnackbarContentProps {}

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
  role?: PaperProps['role'];
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}
