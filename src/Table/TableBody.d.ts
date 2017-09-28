import * as React from 'react';
import { StyledComponent } from '..';

export interface TableBodyProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

export type TableBodyClassKey =
  | 'root'
  ;

declare const TableBody: StyledComponent<TableBodyProps, TableBodyClassKey>;

export default TableBody;
