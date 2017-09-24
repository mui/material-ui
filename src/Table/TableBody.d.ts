import * as React from 'react';
import { StyledComponent } from '..';

export interface TableBodyProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

declare const TableBody: StyledComponent<TableBodyProps>;

export default TableBody;
