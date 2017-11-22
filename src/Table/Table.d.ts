import * as React from 'react';
import { StandardProps } from '..';

export interface TableProps extends StandardProps<
  React.TableHTMLAttributes<HTMLTableElement>,
  TableClassKey
> {
  responsive?: boolean;
}

export type TableClassKey =
  | 'root'
  | 'responsive'
  ;

declare const Table: React.ComponentType<TableProps>;

export default Table;
