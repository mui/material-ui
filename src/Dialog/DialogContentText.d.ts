import * as React from 'react';
import { StyledComponent } from '..';

export interface DialogContentTextProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export default class DialogContentText extends StyledComponent<
  DialogContentTextProps
> {}
