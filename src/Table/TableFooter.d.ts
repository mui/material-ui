import * as React from 'react';
import { StandardProps } from '..';

export interface TableFooterProps extends StandardProps<
  React.HTMLAttributes<HTMLTableSectionElement>,
  TableFooterClassKey
> {}

export type TableFooterClassKey =
  | 'root'
  ;

declare const TableFooter: React.ComponentType<TableFooterProps>;

export default TableFooter;
