import * as React from 'react';
import { StandardProps } from '..';

export interface TableProps extends StandardProps<TableBaseProps, TableClassKey> {
  component?: React.ReactType<TableBaseProps>;
  padding?: Padding;
}

export type TableBaseProps = React.TableHTMLAttributes<HTMLTableElement>;

export type Padding = 'default' | 'checkbox' | 'dense' | 'none';

export type TableClassKey = 'root';

declare const Table: React.ComponentType<TableProps>;

export default Table;
