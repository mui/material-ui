import * as React from 'react';
import { StandardProps } from '..';

export interface TableRowProps extends StandardProps<
  React.HTMLAttributes<HTMLTableRowElement>,
  TableRowClassKey
> {
  hover?: boolean;
  selected?: boolean;
}

export type TableRowClassKey =
  | 'root'
  | 'head'
  | 'footer'
  | 'hover'
  | 'selected'
  ;

declare const TableRow: React.ComponentType<TableRowProps>;

export default TableRow;
