import * as React from 'react';
import { StyledComponent } from '..';

export interface TableHeadProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

declare const TableHead: StyledComponent<TableHeadProps>;

export default TableHead;
