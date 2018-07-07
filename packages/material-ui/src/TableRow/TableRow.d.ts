import * as React from 'react';
import { StandardProps } from '..';

export interface TableRowProps<C = {}> extends StandardProps<TableRowBaseProps, TableRowClassKey> {
  component?: React.ReactType<C & TableRowBaseProps>;
  hover?: boolean;
  selected?: boolean;
}

export type TableRowBaseProps = React.HTMLAttributes<HTMLTableRowElement>;

export type TableRowClassKey = 'root' | 'selected' | 'hover' | 'head' | 'footer';

declare class TableRow<C> extends React.Component<C & TableRowProps<C>> {}

export default TableRow;
