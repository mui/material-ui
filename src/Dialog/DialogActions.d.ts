import * as React from 'react';
import { StyledComponent } from '..';

export interface DialogActionsProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export type DialogActionsClassKey =
  | 'root'
  | 'action'
  | 'button'
  ;

declare const DialogActions: StyledComponent<DialogActionsProps, DialogActionsClassKey>;

export default DialogActions;
