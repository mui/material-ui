import * as React from 'react';
import { StandardProps } from '..';

export interface DialogContentProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, DialogContentClassKey> {
  dividers?: boolean;
}

export type DialogContentClassKey = 'root' | 'dividers';

/**
 *
 * Demos:
 *
 * - [Dialogs](https://material-ui.com/components/dialogs/)
 *
 * API:
 *
 * - [DialogContent API](https://material-ui.com/api/dialog-content/)
 */
declare const DialogContent: React.ComponentType<DialogContentProps>;

export default DialogContent;
