import * as React from 'react';
import { StandardProps } from '..';

export interface DialogContentProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, DialogContentClassKey> {
  dividers?: boolean;
}

export type DialogContentClassKey = 'root' | 'dividers';

/**
 *
 *
 * Demos:
 * - {@link https://material-ui.com/components/dialogs/ Dialogs}
 *
 * API:
 * - {@link https://material-ui.com/api/dialog-content/ DialogContent API}
 *
 */
declare const DialogContent: React.ComponentType<DialogContentProps>;

export default DialogContent;
