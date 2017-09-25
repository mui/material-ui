import * as React from 'react';
import { StyledComponent } from '..';

export interface DialogContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

declare const DialogContent: StyledComponent<DialogContentProps>;

export default DialogContent;
