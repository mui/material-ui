import * as React from 'react';
import { StandardProps } from '..';

export interface TableProps extends StandardProps<TableBaseProps, TableClassKey> {
  component?: React.ElementType<TableBaseProps>;
  padding?: Padding;
  size?: Size;
  stickyHeader?: boolean;
}

export type TableBaseProps = React.TableHTMLAttributes<HTMLTableElement>;

export type Padding = 'default' | 'checkbox' | 'none';

export type Size = 'small' | 'medium';

export type TableClassKey = 'root' | 'stickyHeader';

/**
 *
 *
 * Demos:
 * - {@link https://material-ui.com/components/tables/ Tables}
 *
 * API:
 * - {@link https://material-ui.com/api/Table Table API}
 *
 */
declare const Table: React.ComponentType<TableProps>;

export default Table;
