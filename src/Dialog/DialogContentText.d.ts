import * as React from 'react';
import { StyledComponent } from '..';

export interface DialogContentTextProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

declare const DialogContentText: StyledComponent<DialogContentTextProps>;

export default DialogContentText;
