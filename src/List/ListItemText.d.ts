import * as React from 'react';
import { StyledComponent } from '..';

export interface ListItemTextProps
  extends React.HTMLAttributes<HTMLDivElement> {
  disableTypography?: boolean;
  inset?: boolean;
  primary?: React.ReactNode;
  secondary?: React.ReactNode;
}

declare const ListItemText: StyledComponent<ListItemTextProps>;

export default ListItemText;
