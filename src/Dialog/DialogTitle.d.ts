import * as React from 'react';
import { StyledComponent } from '..';

export interface DialogTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  disableTypography?: boolean;
}

export type DialogTitleClassKey =
  | 'root'
  ;

declare const DialogTitle: StyledComponent<DialogTitleProps, DialogTitleClassKey>;

export default DialogTitle;
