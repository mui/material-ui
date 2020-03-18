import * as React from 'react';
import { StandardProps } from '..';

export interface TableFooterProps extends StandardProps<TableFooterBaseProps, TableFooterClassKey> {
  component?: React.ElementType<TableFooterBaseProps>;
}

export type TableFooterClassKey = 'root';

export type TableFooterBaseProps = React.HTMLAttributes<HTMLTableSectionElement>;

/**
 *
 *
 * Demos:
 *
 * - [Tables](https://material-ui.com/components/tables/)
 *
 * API:
 *
 * - [TableFooter API](https://material-ui.com/api/table-footer/)
 *
 */
declare const TableFooter: React.ComponentType<TableFooterProps>;

export default TableFooter;
