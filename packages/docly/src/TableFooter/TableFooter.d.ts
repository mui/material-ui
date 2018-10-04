import * as React from 'react';
import { StandardProps } from '..';

export interface TableFooterProps extends StandardProps<TableFooterBaseProps, TableFooterClassKey> {
  component?: React.ReactType<TableFooterBaseProps>;
}

export type TableFooterClassKey = 'root';

export type TableFooterBaseProps = React.HTMLAttributes<HTMLTableSectionElement>;

declare const TableFooter: React.ComponentType<TableFooterProps>;

export default TableFooter;
