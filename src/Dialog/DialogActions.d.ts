import * as React from 'react';
import { StandardProps } from '../MuiProps';

export interface DialogActionsProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, DialogActionsClassKey> {}

export type DialogActionsClassKey = 'root' | 'action' | 'button';

declare const DialogActions: React.ComponentType<DialogActionsProps>;

export default DialogActions;
