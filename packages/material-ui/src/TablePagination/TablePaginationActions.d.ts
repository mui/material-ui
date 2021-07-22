import * as React from 'react';
import { IconButtonProps } from '../IconButton/IconButton';

export interface TablePaginationActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  backIconButtonProps?: Partial<IconButtonProps>;
  count: number;
  nextIconButtonProps?: Partial<IconButtonProps>;
  /**
   * @deprecated Use onPageChange instead.
   */
  onChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void;
  page: number;
  rowsPerPage: number;
}

declare const TablePaginationActions: React.ComponentType<TablePaginationActionsProps>;

export default TablePaginationActions;
