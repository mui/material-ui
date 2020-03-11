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
 * - {@link https://material-ui.com/components/tables Tables}
 *
 * API:
 * - {@link https://material-ui.com/api/TableBody TableBody API}
 *
 */
declare const TableBody: React.ComponentType<TableBodyProps>;

export default TableBody;
