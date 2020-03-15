import * as React from 'react';
import { StandardProps } from '..';

export interface DialogActionsProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, DialogActionsClassKey> {
  disableSpacing?: boolean;
}

export type DialogActionsClassKey = 'root' | 'spacing';

/**
 *
 *
 * Demos:
 * - {@link https://material-ui.com/components/dialogs/ Dialogs}
 *
 * API:
 * - {@link https://material-ui.com/api/dialog-actions/ DialogActions API}
 *
 */
declare const DialogActions: React.ComponentType<DialogActionsProps>;

export default DialogActions;
