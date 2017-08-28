import * as React from 'react';
import { StyledComponent } from '..';

export interface DialogTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  disableTypography?: boolean;
}

export default class DialogTitle extends StyledComponent<DialogTitleProps> {}
