import * as React from 'react';
import { StyledComponent } from '..';

export interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  hover?: boolean;
  selected?: boolean;
}

export default class TableRow extends StyledComponent<TableRowProps> {}
