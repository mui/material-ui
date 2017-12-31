import * as React from 'react';
import { StandardProps } from '..';

export interface TableHeadProps extends StandardProps<TableHeadBaseProps, TableHeadClassKey> {
  component?: React.ReactType<TableHeadBaseProps>;
}

export type TableHeadBaseProps = React.HTMLAttributes<HTMLTableSectionElement>;

export type TableHeadClassKey = 'root';

declare const TableHead: React.ComponentType<TableHeadProps>;

export default TableHead;
