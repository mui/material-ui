import * as React from 'react';
import { StandardProps } from '..';

export interface TableHeadProps extends StandardProps<TableHeadBaseProps, TableHeadClassKey> {
  component?: React.ReactType<TableHeadBaseProps>;
}

export type TableHeadClassKey = 'root';

export type TableHeadBaseProps = React.HTMLAttributes<HTMLTableSectionElement>;

declare const TableHead: React.ComponentType<TableHeadProps>;

export default TableHead;
