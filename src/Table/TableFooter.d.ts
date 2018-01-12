import * as React from 'react';
import { StandardProps } from '..';

export interface TableFooterProps extends StandardProps<TableFooterBaseProps, never> {
  component?: React.ReactType<TableFooterBaseProps>;
}

export type TableFooterBaseProps = React.HTMLAttributes<HTMLTableSectionElement>;

declare const TableFooter: React.ComponentType<TableFooterProps>;

export default TableFooter;
