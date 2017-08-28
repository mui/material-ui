import * as React from 'react';
import { StyledComponent } from '..';

export interface ListItemTextProps
  extends React.HTMLAttributes<HTMLDivElement> {
  disableTypography?: boolean;
  inset?: boolean;
  primary?: React.ReactNode;
  secondary?: React.ReactNode;
}

export default class ListItemText extends StyledComponent<ListItemTextProps> {}
