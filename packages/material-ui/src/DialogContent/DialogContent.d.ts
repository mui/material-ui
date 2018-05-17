import * as React from 'react';
import { StandardProps } from '..';

export interface DialogContentProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, DialogContentClassKey> {}

export type DialogContentClassKey = 'root';

declare const DialogContent: React.ComponentType<DialogContentProps>;

export default DialogContent;
