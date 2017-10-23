import * as React from 'react';
import { StandardProps } from '..';
import { TableCellProps, TableCellClassKey } from './TableCell.d'

interface LabelDisplayedRowsArgs {
  from: number;
  to: number;
  count: number;
  page: number;
}

export interface TablePaginationProps extends StandardProps<
  TableCellProps,
  TablePaginationClassKey
> {
  count: number;
  labelDisplayedRows?: (paginationInfo: LabelDisplayedRowsArgs) => Node;
  labelRowsPerPage?: Node;
  onChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void;
  onChangeRowsPerPage: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  page: number;
  rowsPerPage: number;
  rowsPerPageOptions?: number[];
}

export type TablePaginationClassKey =
  | TableCellClassKey
  | 'cell'
  | 'toolbar'
  | 'spacer'
  | 'select'
  | 'selectRoot'
  | 'actions'
  ;

declare const TablePagination: React.ComponentType<TablePaginationProps>;

export default TablePagination;
