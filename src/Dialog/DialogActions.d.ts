import * as React from 'react';
import { StyledComponent } from '..';

export interface DialogActionsProps
  extends React.HTMLAttributes<HTMLDivElement> {}

declare const DialogActions: StyledComponent<DialogActionsProps>;

export default DialogActions;
