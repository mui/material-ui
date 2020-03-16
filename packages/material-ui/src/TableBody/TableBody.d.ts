import * as React from 'react';
import { StandardProps } from '..';

export interface TableBodyProps extends StandardProps<TableBodyBaseProps, TableBodyClassKey> {
  component?: React.ElementType<TableBodyBaseProps>;
}

export type TableBodyClassKey = 'root';

export type TableBodyBaseProps = React.HTMLAttributes<HTMLTableSectionElement>;

/**
 *
 *
 * Demos:
 * - [Tables](https://material-ui.com/components/tables/)
 *
 * API:
 * - [TableBody API](https://material-ui.com/api/table-body/)
 *
 */
declare const TableBody: React.ComponentType<TableBodyProps>;

export default TableBody;
