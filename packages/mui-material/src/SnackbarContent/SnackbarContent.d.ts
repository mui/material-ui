import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { InternalStandardProps as StandardProps } from '..';
import { PaperProps } from '../Paper';
import { SnackbarContentClasses } from './snackbarContentClasses';

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

/**
 *
 * Demos:
 *
 * - [Snackbar](https://v6.mui.com/material-ui/react-snackbar/)
 *
 * API:
 *
 * - [SnackbarContent API](https://v6.mui.com/material-ui/api/snackbar-content/)
 * - inherits [Paper API](https://v6.mui.com/material-ui/api/paper/)
 */
export default function SnackbarContent(props: SnackbarContentProps): React.JSX.Element;
