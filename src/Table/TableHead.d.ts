import * as React from 'react';
import { StyledComponent } from '..';

export interface TableHeadProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

export default class TableHead extends StyledComponent<TableHeadProps> {}
