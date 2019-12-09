import * as React from 'react';
import { StandardProps } from '..';

export interface TableContainerProps
  extends StandardProps<TableContainerBaseProps, TableContainerClassKey> {
  component?: React.ElementType<TableContainerBaseProps>;
}

export type TableContainerBaseProps = React.HTMLAttributes<HTMLDivElement>;

export type TableContainerClassKey = 'root';

declare const TableContainer: React.ComponentType<TableContainerProps>;

export default TableContainer;
