import * as React from 'react';

interface TableContextProps {
  padding: 'default' | 'checkbox' | 'none';
  size: 'default' | 'checkbox' | 'none';
}

declare const TableContext: React.Context<TableContextProps | undefined>;

export default TableContext;
