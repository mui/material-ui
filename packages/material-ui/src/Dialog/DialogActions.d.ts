import * as React from 'react';
import { StandardProps } from '..';

export interface DialogActionsProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, DialogActionsClassKey> {
  disableActionSpacing?: boolean;
}

export type DialogActionsClassKey = 'root' | 'action';

declare const DialogActions: React.ComponentType<DialogActionsProps>;

export default DialogActions;
