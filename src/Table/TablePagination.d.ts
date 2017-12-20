import * as React from 'react';
import { StandardProps } from '..';
import { TableCellProps, TableCellClassKey } from './TableCell.d'

export interface LabelDisplayedRowsArgs {
  from: number;
  to: number;
  count: number;
  page: number;
}

export interface TablePaginationProps extends StandardProps<
  TablePaginationBaseProps,
  TablePaginationClassKey
> {
  component?: string | React.ComponentType<TablePaginationBaseProps>;
  count: number;
  labelDisplayedRows?: (paginationInfo: LabelDisplayedRowsArgs) => React.ReactNode;
  labelRowsPerPage?: React.ReactNode;
  onChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void;
  onChangeRowsPerPage?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  page: number;
  rowsPerPage: number;
  rowsPerPageOptions?: number[];
}

export type TablePaginationBaseProps = TableCellProps;

export type TablePaginationClassKey =
  | TableCellClassKey
  | 'toolbar'
  | 'spacer'
  | 'caption'
  | 'input'
  | 'selectRoot'
  | 'select'
  | 'actions'
  ;

declare const TablePagination: React.ComponentType<TablePaginationProps>;

export default TablePagination;
