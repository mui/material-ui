import * as React from 'react';
import { StandardProps } from '..';

export interface TableBodyProps extends StandardProps<
  React.HTMLAttributes<HTMLTableSectionElement>,
  TableBodyClassKey
> {}

export type TableBodyClassKey =
  | 'root'
  ;

declare const TableBody: React.ComponentType<TableBodyProps>;

export default TableBody;
