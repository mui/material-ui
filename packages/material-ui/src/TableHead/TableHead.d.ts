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
 *
 * - [Tables](https://material-ui.com/components/tables/)
 *
 * API:
 *
 * - [TableHead API](https://material-ui.com/api/table-head/)
 *
 */
declare const TableHead: React.ComponentType<TableHeadProps>;

export default TableHead;
