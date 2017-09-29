import * as React from 'react';
import { StyledComponent } from '..';

export interface ListItemTextProps
  extends React.HTMLAttributes<HTMLDivElement> {
  disableTypography?: boolean;
  inset?: boolean;
  primary?: React.ReactNode;
  secondary?: React.ReactNode;
}

export type ListItemTextClassKey =
  | 'root'
  | 'inset'
  | 'dense'
  | 'text'
  | 'textDense'
  ;

declare const ListItemText: StyledComponent<ListItemTextProps, ListItemTextClassKey>;

export default ListItemText;
