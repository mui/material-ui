import * as React from 'react';
import { StandardProps } from '..';

export interface TableProps extends StandardProps<
  React.TableHTMLAttributes<HTMLTableElement>,
  TableClassKey
> {}

export type TableClassKey =
  | 'root'
  ;

declare const Table: React.ComponentType<TableProps>;

export default Table;
