import * as React from 'react';
import { SxProps } from '@mui/system';
import { InternalStandardProps as StandardProps, Theme } from '..';
import { DialogActionsClasses } from './dialogActionsClasses';

export interface DialogActionsProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<DialogActionsClasses>;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  /**
   * If `true`, the actions do not have additional margin.
   * @default false
   */
  disableSpacing?: boolean;
}

/**
 *
 * Demos:
 *
 * - [Dialogs](https://mui.com/components/dialogs/)
 *
 * API:
 *
 * - [DialogActions API](https://mui.com/api/dialog-actions/)
 */
export default function DialogActions(props: DialogActionsProps): JSX.Element;
