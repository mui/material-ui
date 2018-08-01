import * as React from 'react';
import { StandardProps } from '..';
import { TypographyProps } from '../Typography';

export interface DialogContentTextProps
  extends StandardProps<TypographyProps, DialogContentTextClassKey> {}

export type DialogContentTextClassKey = 'root';

declare const DialogContentText: React.ComponentType<DialogContentTextProps>;

export default DialogContentText;
