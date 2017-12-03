import * as React from 'react';
import { StandardProps } from '..';

export interface TableFooterProps extends StandardProps<
  TableFooterBaseProps,
  TableFooterClassKey
> {
  component?: string | React.ComponentType<TableFooterBaseProps>;
}

export type TableFooterBaseProps = React.HTMLAttributes<HTMLTableSectionElement>;

export type TableFooterClassKey =
  | 'root'
  ;

declare const TableFooter: React.ComponentType<TableFooterProps>;

export default TableFooter;
