import * as React from 'react';
import { StandardProps } from '../MuiProps';

export interface DialogTitleProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, DialogTitleClassKey> {
  disableTypography?: boolean;
}

export type DialogTitleClassKey = 'root';

declare const DialogTitle: React.ComponentType<DialogTitleProps>;

export default DialogTitle;
