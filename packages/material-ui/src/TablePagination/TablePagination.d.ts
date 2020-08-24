import * as React from 'react';
import { Omit } from '@material-ui/types';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
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
      /**
       * The component used for displaying the actions.
       * Either a string to use a HTML element or a component.
       */
      ActionsComponent?: React.ElementType<TablePaginationActionsProps>;
      /**
       * Props applied to the back arrow [`IconButton`](/api/icon-button/) component.
       */
      backIconButtonProps?: Partial<IconButtonProps>;
      /**
       * Override or extend the styles applied to the component.
       */
      classes?: {
        /** Styles applied to the root element. */
        root?: string;
        /** Styles applied to the Toolbar component. */
        toolbar?: string;
        /** Styles applied to the spacer element. */
        spacer?: string;
        /** Styles applied to the caption Typography components if `variant="caption"`. */
        caption?: string;
        /** Styles applied to the Select component root element. */
        selectRoot?: string;
        /** Styles applied to the Select component `select` class. */
        select?: string;
        /** Styles applied to the Select component `icon` class. */
        selectIcon?: string;
        /** Styles applied to the `InputBase` component. */
        input?: string;
        /** Styles applied to the MenuItem component. */
        menuItem?: string;
        /** Styles applied to the internal `TablePaginationActions` component. */
        actions?: string;
      };
      /**
       * The total number of rows.
       *
       * To enable server side pagination for an unknown number of items, provide -1.
       */
      count: number;
      /**
       * Accepts a function which returns a string value that provides a user-friendly name for the current page.
       *
       * For localization purposes, you can use the provided [translations](/guides/localization/).
       *
       * @param {string} type The link or button type to format ('first' | 'last' | 'next' | 'previous').
       * @returns {string}
       */
      getItemAriaLabel?: (type: 'first' | 'last' | 'next' | 'previous') => string;
      /**
       * Customize the displayed rows label. Invoked with a `{ from, to, count, page }`
       * object.
       *
       * For localization purposes, you can use the provided [translations](/guides/localization/).
       */
      labelDisplayedRows?: (paginationInfo: LabelDisplayedRowsArgs) => React.ReactNode;
      /**
       * Customize the rows per page label.
       *
       * For localization purposes, you can use the provided [translations](/guides/localization/).
       */
      labelRowsPerPage?: React.ReactNode;
      /**
       * Props applied to the next arrow [`IconButton`](/api/icon-button/) element.
       */
      nextIconButtonProps?: Partial<IconButtonProps>;
      /**
       * Callback fired when the page is changed.
       *
       * @param {object} event The event source of the callback.
       * @param {number} page The page selected.
       */
      onChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void;
      /**
       * Callback fired when the number of rows per page is changed.
       *
       * @param {object} event The event source of the callback.
       */
      onChangeRowsPerPage?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
      /**
       * The zero-based index of the current page.
       */
      page: number;
      /**
       * The number of rows per page.
       */
      rowsPerPage: number;
      /**
       * Customizes the options of the rows per page select field. If less than two options are
       * available, no select field will be displayed.
       */
      rowsPerPageOptions?: Array<number | { value: number; label: string }>;
      /**
       * Props applied to the rows per page [`Select`](/api/select/) element.
       */
      SelectProps?: Partial<SelectProps>;
      /**
       * If `true`, show the first-page button.
       */
      showFirstButton?: boolean;
      /**
       * If `true`, show the last-page button.
       */
      showLastButton?: boolean;
    };
  defaultComponent: D;
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

export type TablePaginationClassKey = keyof NonNullable<TablePaginationProps['classes']>;

export type TablePaginationBaseProps = Omit<TableCellProps, 'classes' | 'component' | 'children'>;

export type TablePaginationProps<
  D extends React.ElementType = React.ComponentType<TablePaginationBaseProps>,
  P = {}
> = OverrideProps<TablePaginationTypeMap<P, D>, D>;

export default TablePagination;
