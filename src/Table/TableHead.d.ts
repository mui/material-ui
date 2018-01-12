import * as React from 'react';

export interface TableHeadProps extends TableHeadBaseProps {
  component?: React.ReactType<TableHeadBaseProps>;
}

export type TableHeadBaseProps = React.HTMLAttributes<HTMLTableSectionElement>;

declare const TableHead: React.ComponentType<TableHeadProps>;

export default TableHead;
