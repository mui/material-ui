import { Context } from 'react';
import { Padding } from './Table';

interface TableContextProps {
  padding: Padding;
}

declare const TableContext: Context<TableContextProps | undefined>;

export default TableContext;
