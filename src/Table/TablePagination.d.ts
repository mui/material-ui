import * as React from 'react';
import { StyledComponent } from '..';
import { TableCellProps, TableCellClassKey } from './TableCell.d'

interface LabelDisplayedRowsArgs {
  from: number;
  to: number;
  count: number;
  page: number;
}

export interface TablePaginationProps {
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
  | 'cell'
  | 'toolbar'
  | 'spacer'
  | 'select'
  | 'selectRoot'
  | 'actions'
  ;

declare const TablePagination: StyledComponent<TablePaginationProps & TableCellProps, TablePaginationClassKey & TableCellClassKey>;

export default TablePagination;
