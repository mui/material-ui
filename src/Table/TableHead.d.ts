import * as React from 'react';
import { StandardProps } from '..';

export interface TableHeadProps extends StandardProps<TableHeadBaseProps, never> {
  component?: React.ReactType<TableHeadBaseProps>;
}

export type TableHeadBaseProps = React.HTMLAttributes<HTMLTableSectionElement>;

declare const TableHead: React.ComponentType<TableHeadProps>;

export default TableHead;
