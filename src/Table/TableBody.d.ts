import * as React from 'react';
import { StandardProps } from '..';

export interface TableBodyProps extends StandardProps<
  TableBodyBaseProps,
  TableBodyClassKey
> {
  component?: string | React.ComponentType<TableBodyBaseProps>;
}

export type TableBodyBaseProps = React.HTMLAttributes<HTMLTableSectionElement>;

export type TableBodyClassKey =
  | 'root'
  ;

declare const TableBody: React.ComponentType<TableBodyProps>;

export default TableBody;
