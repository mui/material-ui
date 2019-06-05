import * as React from 'react';
import { StandardProps } from '..';

export interface TableRowProps extends StandardProps<TableRowBaseProps, TableRowClassKey> {
  component?: React.ElementType<TableRowBaseProps>;
  hover?: boolean;
  selected?: boolean;
}

export type TableRowBaseProps = React.HTMLAttributes<HTMLTableRowElement>;

export type TableRowClassKey = 'root' | 'selected' | 'hover' | 'head' | 'footer';

declare const TableRow: React.ComponentType<TableRowProps>;

export default TableRow;
