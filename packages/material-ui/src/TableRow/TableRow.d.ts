import * as React from 'react';
import { StandardProps } from '..';

export interface TableRowProps extends StandardProps<TableRowBaseProps, TableRowClassKey> {
  component?: React.ElementType<TableRowBaseProps>;
  hover?: boolean;
  selected?: boolean;
}

export type TableRowBaseProps = React.HTMLAttributes<HTMLTableRowElement>;

export type TableRowClassKey = 'root' | 'selected' | 'hover' | 'head' | 'footer';

/**
 * Will automatically set dynamic row height
 * based on the material table element parent (head, body, etc).
 *
 * Demos:
 * - [Tables](https://material-ui.com/components/tables/)
 *
 * API:
 * - [TableRow API](https://material-ui.com/api/table-row/)
 *
 */
declare const TableRow: React.ComponentType<TableRowProps>;

export default TableRow;
