import * as React from 'react';
import { StyledComponent } from '..';

export interface TableProps
  extends React.TableHTMLAttributes<HTMLTableElement> {}

declare const Table: StyledComponent<TableProps>;

export default Table;
