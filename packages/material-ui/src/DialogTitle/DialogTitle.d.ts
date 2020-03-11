import * as React from 'react';
import { StandardProps } from '..';

export interface DialogTitleProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, DialogTitleClassKey> {
  disableTypography?: boolean;
}

export type DialogTitleClassKey = 'root';

/**
 *
 *
 * Demos:
 * - {@link https://material-ui.com/components/dialogs Dialogs}
 *
 * API:
 * - {@link https://material-ui.com/api/DialogTitle DialogTitle API}
 *
 */
declare const DialogTitle: React.ComponentType<DialogTitleProps>;

export default DialogTitle;
