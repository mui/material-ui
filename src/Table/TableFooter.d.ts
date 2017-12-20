import * as React from 'react';
import { StandardProps } from '../MuiProps';

export interface TableFooterProps extends StandardProps<TableFooterBaseProps, TableFooterClassKey> {
  component?: string | React.ComponentType<TableFooterBaseProps>;
}

export type TableFooterBaseProps = React.HTMLAttributes<HTMLTableSectionElement>;

export type TableFooterClassKey = 'root';

declare const TableFooter: React.ComponentType<TableFooterProps>;

export default TableFooter;
