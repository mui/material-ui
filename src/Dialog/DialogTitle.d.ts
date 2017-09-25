import * as React from 'react';
import { StyledComponent } from '..';

export interface DialogTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  disableTypography?: boolean;
}

declare const DialogTitle: StyledComponent<DialogTitleProps>;

export default DialogTitle;
