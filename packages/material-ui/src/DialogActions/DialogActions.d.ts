import * as React from 'react';
import { SxProps } from '@material-ui/system';
import { InternalStandardProps as StandardProps, Theme } from '..';

export interface DialogActionsProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    /** Styles applied to the root element. */
    root?: string;
    /** Styles applied to the root element unless `disableSpacing={true}`. */
    spacing?: string;
  };
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

export type DialogActionsClassKey = keyof NonNullable<DialogActionsProps['classes']>;

/**
 *
 * Demos:
 *
 * - [Dialogs](https://material-ui.com/components/dialogs/)
 *
 * API:
 *
 * - [DialogActions API](https://material-ui.com/api/dialog-actions/)
 */
export default function DialogActions(props: DialogActionsProps): JSX.Element;
