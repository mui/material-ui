import * as React from 'react';
import { StandardProps } from '..';

export interface DialogTitleProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, DialogTitleClassKey> {
  disableTypography?: boolean;
}

export type DialogTitleClassKey = 'root';

/**
 *
 * Demos:
 *
 * - [Dialogs](https://material-ui.com/components/dialogs/)
 *
 * API:
 *
 * - [DialogTitle API](https://material-ui.com/api/dialog-title/)
 */
declare const DialogTitle: React.ComponentType<DialogTitleProps>;

export default DialogTitle;
