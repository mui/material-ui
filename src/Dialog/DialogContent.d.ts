import * as React from 'react';
import { StyledComponent } from '..';

export interface DialogContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export type DialogContentClassKey =
  | 'root'
  ;

declare const DialogContent: StyledComponent<DialogContentProps, DialogContentClassKey>;

export default DialogContent;
