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
      backIconButtonText?: string;
      backIconButtonProps?: Partial<IconButtonProps>;
      count: number;
      labelDisplayedRows?: (paginationInfo: LabelDisplayedRowsArgs) => React.ReactNode;
      labelRowsPerPage?: React.ReactNode;
      nextIconButtonProps?: Partial<IconButtonProps>;
      nextIconButtonText?: string;
      /**
       * Callback fired when the page is changed.
       *
       * @param {object} event The event source of the callback.
       * @param {number} page The page selected.
       * @deprecated Use the onPageChange prop instead.
       */
      onChangePage?: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void;
      onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void;
      /**
       * Callback fired when the number of rows per page is changed.
       *
       * @param {object} event The event source of the callback.
       * @deprecated Use the onRowsPerPageChange prop instead.
       */
      onChangeRowsPerPage?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
      onRowsPerPageChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
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
 * - [Tables](https://mui.com/components/tables/)
 *
 * API:
 *
 * - [TablePagination API](https://mui.com/api/table-pagination/)
 * - inherits [TableCell API](https://mui.com/api/table-cell/)
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
