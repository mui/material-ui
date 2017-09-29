import * as React from 'react';
import { StyledComponent } from '..';

export interface TableFooterProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

export type TableFooterClassKey =
  | 'root'
  ;

declare const TableFooter: StyledComponent<TableFooterProps, TableFooterClassKey>;

export default TableFooter;
