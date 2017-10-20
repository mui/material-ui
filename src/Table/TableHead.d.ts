import * as React from 'react';
import { StandardProps } from '..';

export interface TableHeadProps extends StandardProps<
  React.HTMLAttributes<HTMLTableSectionElement>,
  TableHeadClassKey
> {}

export type TableHeadClassKey =
  | 'root'
  ;

declare const TableHead: React.ComponentType<TableHeadProps>;

export default TableHead;
