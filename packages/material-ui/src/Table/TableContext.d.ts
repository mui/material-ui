import * as React from 'react';
import { Padding, Size } from './Table';

interface TableContextProps {
  padding: Padding;
  size: Size;
}

declare const TableContext: React.Context<TableContextProps | undefined>;

export default TableContext;
