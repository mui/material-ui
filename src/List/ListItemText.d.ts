import * as React from 'react';
import { StandardProps } from '..';

export interface ListItemTextProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, ListItemTextClassKey> {
  disableTypography?: boolean;
  inset?: boolean;
  primary?: React.ReactNode;
  secondary?: React.ReactNode;
}

export type ListItemTextClassKey =
  | 'root'
  | 'inset'
  | 'dense'
  | 'primary'
  | 'secondary'
  | 'textDense';

declare const ListItemText: React.ComponentType<ListItemTextProps>;

export default ListItemText;
