import * as React from 'react';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
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

export interface TablePaginationTypeMap<P, D extends React.ElementType> {
  props: P &
    TablePaginationBaseProps & {
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
      rowsPerPageOptions?: Array<number | { value: number; label: string }>;
      SelectProps?: Partial<SelectProps>;
    };
  defaultComponent: D;
  classKey: TablePaginationClassKey;
}

/**
 * A `TableCell` based component for placing inside `TableFooter` for pagination.
 * Demos:
 *
 * - [Tables](https://material-ui.com/components/tables/)
 *
 * API:
 *
 * - [TablePagination API](https://material-ui.com/api/table-pagination/)
 * - inherits [TableCell API](https://material-ui.com/api/table-cell/)
 */
declare const TablePagination: OverridableComponent<TablePaginationTypeMap<
  {},
  React.ComponentType<TablePaginationBaseProps>
>>;

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

export type TablePaginationProps<
  D extends React.ElementType = React.ComponentType<TablePaginationBaseProps>,
  P = {}
> = OverrideProps<TablePaginationTypeMap<P, D>, D>;

export default TablePagination;
