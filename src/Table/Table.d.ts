import * as React from 'react';
import { StyledComponent } from '..';

export interface TableProps
  extends React.TableHTMLAttributes<HTMLTableElement> {}

export default class Table extends StyledComponent<TableProps> {}
