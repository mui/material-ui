import * as React from 'react';
import { StyledComponent } from '..';

export interface TableProps
  extends React.TableHTMLAttributes<HTMLTableElement> {}

export type TableClassKey =
  | 'root'
  ;

declare const Table: StyledComponent<TableProps, TableClassKey>;

export default Table;
