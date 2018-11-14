import * as React from 'react';
import { TablePaginationActionsProps } from './TablePaginationActions';
import { StandardProps } from '..';
import { TableCellProps } from '../TableCell';
import { IconButtonProps } from '../IconButton';
import { SelectProps } from '../Select';

export interface LabelDisplayedRowsArgs {
  from: number;
  to: number;
  count: number;
  page: number;
}

export interface TablePaginationProps
  extends StandardProps<TablePaginationBaseProps, TablePaginationClassKey> {
  ActionsComponent?: React.ReactType<TablePaginationActionsProps>;
  backIconButtonProps?: Partial<IconButtonProps>;
  component?: React.ReactType<TablePaginationBaseProps>;
  count: number;
  labelDisplayedRows?: (paginationInfo: LabelDisplayedRowsArgs) => React.ReactNode;
  labelRowsPerPage?: React.ReactNode;
  nextIconButtonProps?: Partial<IconButtonProps>;
  onChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void;
  onChangeRowsPerPage?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  page: number;
  rowsPerPage: number;
  rowsPerPageOptions?: number[];
  SelectProps?: Partial<SelectProps>;
}

export type TablePaginationBaseProps = TableCellProps;

export type TablePaginationClassKey =
  | 'root'
  | 'toolbar'
  | 'spacer'
  | 'menuItem'
  | 'caption'
  | 'input'
  | 'selectRoot'
  | 'select'
  | 'selectIcon'
  | 'actions';

declare const TablePagination: React.ComponentType<TablePaginationProps>;

export default TablePagination;
