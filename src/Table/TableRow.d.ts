import * as React from 'react';
import { StyledComponent } from '..';

export interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
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

declare const TableRow: StyledComponent<TableRowProps, TableRowClassKey>;

export default TableRow;
