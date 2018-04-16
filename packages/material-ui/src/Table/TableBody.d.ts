import * as React from 'react';

export interface TableBodyProps extends TableBodyBaseProps {
  component?: React.ReactType<TableBodyBaseProps>;
}

export type TableBodyBaseProps = React.HTMLAttributes<HTMLTableSectionElement>;

declare const TableBody: React.ComponentType<TableBodyProps>;

export default TableBody;
