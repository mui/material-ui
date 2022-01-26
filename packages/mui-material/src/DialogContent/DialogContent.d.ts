import * as React from 'react';
import { SxProps } from '@mui/system';
import { InternalStandardProps as StandardProps, Theme } from '..';
import { DialogContentClasses } from './dialogContentClasses';

export interface DialogContentProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<DialogContentClasses>;
  /**
   * Display the top and bottom dividers.
   * @default false
   */
  dividers?: boolean;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

/**
 *
 * Demos:
 *
 * - [Dialogs](https://mui.com/components/dialogs/)
 *
 * API:
 *
 * - [DialogContent API](https://mui.com/api/dialog-content/)
 */
export default function DialogContent(props: DialogContentProps): JSX.Element;
