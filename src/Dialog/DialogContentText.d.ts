import * as React from 'react';
import { StyledComponent } from '..';

export interface DialogContentTextProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export type DialogContentTextClassKey =
  | 'root'
  ;

declare const DialogContentText: StyledComponent<DialogContentTextProps, DialogContentTextClassKey>;

export default DialogContentText;
