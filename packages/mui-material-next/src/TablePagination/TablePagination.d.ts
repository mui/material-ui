import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { OverridableComponent, OverrideProps } from '@mui/material/OverridableComponent';
import {
  TablePaginationActionsUnstyledProps,
  TablePaginationUnstyledProps,
} from '@mui/base/TablePaginationUnstyled';
import { TableCellProps } from '@mui/material/TableCell';
import { IconButtonProps } from '@mui/material/IconButton';
import { SelectProps } from '@mui/material/Select';
import { TablePaginationClasses } from './tablePaginationClasses';

export interface LabelDisplayedRowsArgs {
  from: number;
  to: number;
  count: number;
  page: number;
}

export interface TablePaginationTypeMap<P, D extends React.ElementType> {
  props: P &
    TablePaginationBaseProps & {
      /**
       * The component used for displaying the actions.
       * Either a string to use a HTML element or a component.
       * @default TablePaginationActions
       */
      ActionsComponent?: React.ElementType<TablePaginationActionsUnstyledProps>;
      /**
       * Props applied to the back arrow [`IconButton`](/api/icon-button/) component.
       */
      backIconButtonProps?: Partial<IconButtonProps>;
      /**
       * Override or extend the styles applied to the component.
       */
      classes?: Partial<TablePaginationClasses>;
      /**
       * Props applied to the next arrow [`IconButton`](/api/icon-button/) element.
       */
      nextIconButtonProps?: Partial<IconButtonProps>;
      /**
       * Props applied to the rows per page [`Select`](/api/select/) element.
       * @default {}
       */
      SelectProps?: Partial<SelectProps>;
      /**
       * If `true`, show the first-page button.
       * @default false
       */
      showFirstButton?: boolean;
      /**
       * If `true`, show the last-page button.
       * @default false
       */
      showLastButton?: boolean;
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx?: SxProps<Theme>;
    };
  defaultComponent: D;
}

/**
 * A `TableCell` based component for placing inside `TableFooter` for pagination.
 *
 * Demos:
 *
 * - [Tables](https://mui.com/components/tables/)
 *
 * API:
 *
 * - [TablePagination API](https://mui.com/api/table-pagination/)
 * - inherits [TableCell API](https://mui.com/api/table-cell/)
 */
declare const TablePagination: OverridableComponent<
  TablePaginationTypeMap<{}, React.JSXElementConstructor<TablePaginationBaseProps>>
>;

export type TablePaginationBaseProps = Omit<TableCellProps, 'classes' | 'component' | 'children'> &
  TablePaginationUnstyledProps;

export type TablePaginationProps<
  D extends React.ElementType = React.JSXElementConstructor<TablePaginationBaseProps>,
  P = {},
> = OverrideProps<TablePaginationTypeMap<P, D>, D>;

export default TablePagination;
