import * as React from 'react';
import { StandardProps } from '..';

export interface TableHeadProps extends StandardProps<TableHeadBaseProps, TableHeadClassKey> {
  component?: React.ElementType<TableHeadBaseProps>;
}

export type TableHeadClassKey = 'root';

export type TableHeadBaseProps = React.HTMLAttributes<HTMLTableSectionElement>;

/**
 * 
 *
 * Demos:
 * - {@link https://material-ui.com/components/tables Tables}
 *
 * API:
 * - {@link https://material-ui.com/api/TableHead TableHead API}
 * 
 */
declare const TableHead: React.ComponentType<TableHeadProps>;

export default TableHead;
