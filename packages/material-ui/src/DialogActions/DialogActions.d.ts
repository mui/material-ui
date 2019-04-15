import * as React from 'react';
import { StandardProps } from '..';

export interface DialogActionsProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, DialogActionsClassKey> {
  disableSpacing?: boolean;
}

export type DialogActionsClassKey = 'root' | 'spacing';

declare const DialogActions: React.ComponentType<DialogActionsProps>;

export default DialogActions;
