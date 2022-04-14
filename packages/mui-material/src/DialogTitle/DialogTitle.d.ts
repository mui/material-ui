import * as React from 'react';
import { SxProps } from '@mui/system';
import { InternalStandardProps as StandardProps, Theme } from '..';
import { DialogTitleClasses } from './dialogTitleClasses';

export interface DialogTitleProps extends StandardProps<React.HTMLAttributes<HTMLHeadingElement>> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<DialogTitleClasses>;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

/**
 *
 * Demos:
 *
 * - [Dialogs](https://mui.com/material-ui/react-dialog/)
 *
 * API:
 *
 * - [DialogTitle API](https://mui.com/material-ui/api/dialog-title/)
 */
export default function DialogTitle(props: DialogTitleProps): JSX.Element;
