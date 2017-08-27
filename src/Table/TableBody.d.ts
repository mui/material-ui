import * as React from 'react';
import { StyledComponent } from '..';

export interface TableBodyProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

export default class TableBody extends StyledComponent<TableBodyProps> {}
