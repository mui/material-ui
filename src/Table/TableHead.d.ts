import * as React from 'react';
import { StyledComponent } from '..';

export interface TableHeadProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

export type TableHeadClassKey =
  | 'root'
  ;

declare const TableHead: StyledComponent<TableHeadProps, TableHeadClassKey>;

export default TableHead;
