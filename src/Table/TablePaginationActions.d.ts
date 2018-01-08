import * as React from 'react';
import { StandardProps } from '..';
import { TableCellClassKey } from './TableCell.d';
import { IconButtonProps } from '../IconButton/IconButton';

export interface TablePaginationActionsProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, TablePaginationActionsClassKey> {
  backIconButtonProps?: IconButtonProps;
  count: number;
  nextIconButtonProps?: IconButtonProps;
  onChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void;
  page: number;
  rowsPerPage: number;
}

export type TablePaginationActionsClassKey = 'root';

declare const TablePaginationActions: React.ComponentType<TablePaginationActionsProps>;

export default TablePaginationActions;
