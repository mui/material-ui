import * as React from 'react';
import { StandardProps } from '..';

export interface TableHeadProps extends StandardProps<
  TableHeadBaseProps,
  TableHeadClassKey
> {
  component?: string | React.ComponentType<TableHeadBaseProps>;
}

export type TableHeadBaseProps = React.HTMLAttributes<HTMLTableSectionElement>;

export type TableHeadClassKey =
  | 'root'
  ;

declare const TableHead: React.ComponentType<TableHeadProps>;

export default TableHead;
