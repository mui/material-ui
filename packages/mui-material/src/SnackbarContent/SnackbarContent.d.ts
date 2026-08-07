import type * as React from 'react';
import { type SxProps } from '@mui/system';
import { type Theme } from '../styles';
import { type InternalStandardProps as StandardProps } from '../internal';
import { type PaperProps } from '../Paper';
import { type SnackbarContentClasses } from './snackbarContentClasses';

export interface SnackbarContentProps extends StandardProps<PaperProps, 'children'> {
  /**
   * The action to display. It renders after the message, at the end of the snackbar.
   */
  action?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<SnackbarContentClasses> | undefined;
  /**
   * The message to display.
   */
  message?: React.ReactNode;
  /**
   * The ARIA role attribute of the element.
   * @default 'alert'
   */
  role?: PaperProps['role'] | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

/**
 *
 * Demos:
 *
 * - [Snackbar](https://mui.com/material-ui/react-snackbar/)
 *
 * API:
 *
 * - [SnackbarContent API](https://mui.com/material-ui/api/snackbar-content/)
 * - inherits [Paper API](https://mui.com/material-ui/api/paper/)
 */
export default function SnackbarContent(props: SnackbarContentProps): React.JSX.Element;
