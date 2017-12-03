import * as React from 'react';
import { StandardProps } from '..';

export interface TableProps extends StandardProps<
  TableBaseProps,
  TableClassKey
> {
  component?: string | React.ComponentType<TableBaseProps>;
}

export type TableBaseProps = React.TableHTMLAttributes<HTMLTableElement>;

export type TableClassKey =
  | 'root'
  ;

declare const Table: React.ComponentType<TableProps>;

export default Table;
