import * as React from 'react';
import { InternalStandardProps as StandardProps } from '..';

export interface DialogActionsProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * See [CSS API](#css) below for more details.
   */
  classes?: {
    /** Styles applied to the root element. */
    root?: string;
    /** Styles applied to the root element if `disableSpacing={false}`. */
    spacing?: string;
  };
  /**
   * If `true`, the actions do not have additional margin.
   */
  disableSpacing?: boolean;
}

export type DialogActionsClassKey = 'root' | 'spacing';

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
