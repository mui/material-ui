import * as React from 'react';
import { OverridableComponent, SimplifiedPropsOf } from '../OverridableComponent';
import { Omit } from '@material-ui/types';
import { TablePaginationActionsProps } from './TablePaginationActions';
import { TableCellProps } from '../TableCell';
import { IconButtonProps } from '../IconButton';
import { SelectProps } from '../Select';

export interface LabelDisplayedRowsArgs {
  from: number;
  to: number;
  count: number;
  page: number;
}

declare const TablePagination: OverridableComponent<{
  props: TablePaginationBaseProps & {
    ActionsComponent?: React.ElementType<TablePaginationActionsProps>;
    backIconButtonProps?: Partial<IconButtonProps>;
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
  };
  defaultComponent: React.ComponentType<TablePaginationBaseProps>;
  classKey: TablePaginationClassKey;
}>;

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

export type TablePaginationBaseProps = Omit<TableCellProps, 'classes' | 'component'>;

export type TablePaginationProps = SimplifiedPropsOf<typeof TablePagination>;

export default TablePagination;
