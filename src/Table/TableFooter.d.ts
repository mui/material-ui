import * as React from 'react';
import { StyledComponent } from '..';

export interface TableFooterProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

declare const TableFooter: StyledComponent<TableFooterProps>;

export default TableFooter;
