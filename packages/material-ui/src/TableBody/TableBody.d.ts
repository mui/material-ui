import * as React from 'react';
import { StandardProps } from '..';

export interface TableBodyProps extends StandardProps<TableBodyBaseProps, TableBodyClassKey> {
  component?: React.ReactType<TableBodyBaseProps>;
}

export type TableBodyClassKey = 'root';

export type TableBodyBaseProps = React.HTMLAttributes<HTMLTableSectionElement>;

declare const TableBody: React.ComponentType<TableBodyProps>;

export default TableBody;
