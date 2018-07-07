import * as React from 'react';
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

export interface TablePaginationProps<C = {}>
  extends StandardProps<TablePaginationBaseProps<C>, TablePaginationClassKey> {
  ActionsComponent?: React.ReactType<C & TablePaginationBaseProps<C>>;
  backIconButtonProps?: Partial<C & IconButtonProps<C>>;
  component?: React.ReactType<C & TablePaginationBaseProps<C>>;
  count: number;
  labelDisplayedRows?: (paginationInfo: LabelDisplayedRowsArgs) => React.ReactNode;
  labelRowsPerPage?: React.ReactNode;
  nextIconButtonProps?: Partial<C & IconButtonProps<C>>;
  onChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void;
  onChangeRowsPerPage?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  page: number;
  rowsPerPage: number;
  rowsPerPageOptions?: number[];
  SelectProps?: Partial<C & SelectProps<C>>;
}

export type TablePaginationBaseProps<C> = TableCellProps<C>;

export type TablePaginationClassKey =
  | 'root'
  | 'toolbar'
  | 'spacer'
  | 'menuItem'
  | 'caption'
  | 'input'
  | 'selectRoot'
  | 'select'
  | 'actions';

declare class TablePagination<C> extends React.Component<C & TablePaginationProps<C>> {}

export default TablePagination;
