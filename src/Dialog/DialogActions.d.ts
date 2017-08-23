import * as React from 'react';
import { StyledComponent } from '..';

export interface DialogActionsProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export default class DialogActions extends StyledComponent<
  DialogActionsProps
> {}
