import * as React from 'react';
import { StyledComponent } from '..';

export interface DialogContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export default class DialogContent extends StyledComponent<
  DialogContentProps
> {}
