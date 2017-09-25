import * as React from 'react';
import { StyledComponent } from '..';

export interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  hover?: boolean;
  selected?: boolean;
}

declare const TableRow: StyledComponent<TableRowProps>;

export default TableRow;
