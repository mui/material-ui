import * as React from 'react';
import { StyledComponent } from '..';

export interface TableFooterProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

export default class TableFooter extends StyledComponent<TableFooterProps> {}
