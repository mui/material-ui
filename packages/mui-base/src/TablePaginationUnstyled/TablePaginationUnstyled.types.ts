import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { SlotComponentProps } from '../utils';
import TablePaginationActionsUnstyled from './TablePaginationActionsUnstyled';

export interface LabelDisplayedRowsArgs {
  from: number;
  to: number;
  count: number;
  page: number;
}

export type ItemAriaLabelType = 'first' | 'last' | 'next' | 'previous';

export interface TablePaginationUnstyledRootSlotPropsOverrides {}
export interface TablePaginationUnstyledActionsSlotPropsOverrides {}
export interface TablePaginationUnstyledSelectSlotPropsOverrides {}
export interface TablePaginationUnstyledSelectLabelSlotPropsOverrides {}
export interface TablePaginationUnstyledMenuItemSlotPropsOverrides {}
export interface TablePaginationUnstyledDisplayedRowsSlotPropsOverrides {}
export interface TablePaginationUnstyledToolbarSlotPropsOverrides {}
export interface TablePaginationUnstyledSpacerSlotPropsOverrides {}

export interface TablePaginationUnstyledOwnProps {
  /**
   * @ignore
   */
  colSpan?: number;
  /**
   * The components used for each slot inside the TablePagination.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots?: TablePaginationUnstyledSlots;
  /**
   * The props used for each slot inside the TablePagination.
   * @default {}
   */
  slotProps?: {
    root?: SlotComponentProps<
      'td',
      TablePaginationUnstyledRootSlotPropsOverrides,
      TablePaginationUnstyledOwnerState
    >;
    actions?: SlotComponentProps<
      typeof TablePaginationActionsUnstyled,
      TablePaginationUnstyledActionsSlotPropsOverrides,
      TablePaginationUnstyledOwnerState
    >;
    select?: SlotComponentProps<
      'select',
      TablePaginationUnstyledSelectSlotPropsOverrides,
      TablePaginationUnstyledOwnerState
    >;
    selectLabel?: SlotComponentProps<
      'p',
      TablePaginationUnstyledSelectLabelSlotPropsOverrides,
      TablePaginationUnstyledOwnerState
    >;
    menuItem?: SlotComponentProps<
      'option',
      TablePaginationUnstyledMenuItemSlotPropsOverrides,
      TablePaginationUnstyledOwnerState
    >;
    displayedRows?: SlotComponentProps<
      'p',
      TablePaginationUnstyledDisplayedRowsSlotPropsOverrides,
      TablePaginationUnstyledOwnerState
    >;
    toolbar?: SlotComponentProps<
      'div',
      TablePaginationUnstyledToolbarSlotPropsOverrides,
      TablePaginationUnstyledOwnerState
    >;
    spacer?: SlotComponentProps<
      'div',
      TablePaginationUnstyledSpacerSlotPropsOverrides,
      TablePaginationUnstyledOwnerState
    >;
  };
  /**
   * The total number of rows.
   *
   * To enable server side pagination for an unknown number of items, provide -1.
   */
  count: number;
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current page.
   * This is important for screen reader users.
   *
   * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
   * @param {string} type The link or button type to format ('first' | 'last' | 'next' | 'previous').
   * @returns {string}
   * @default function defaultGetAriaLabel(type: ItemAriaLabelType) {
   *   return `Go to ${type} page`;
   * }
   */
  getItemAriaLabel?: (type: ItemAriaLabelType) => string;
  /**
   * Customize the displayed rows label. Invoked with a `{ from, to, count, page }`
   * object.
   *
   * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
   * @default function defaultLabelDisplayedRows({ from, to, count }: LabelDisplayedRowsArgs) {
   *   return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
   * }
   */
  labelDisplayedRows?: (paginationInfo: LabelDisplayedRowsArgs) => React.ReactNode;
  /**
   * Id of the label element within the pagination.
   */
  labelId?: string;
  /**
   * Customize the rows per page label.
   *
   * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
   * @default 'Rows per page:'
   */
  labelRowsPerPage?: React.ReactNode;
  /**
   * Callback fired when the page is changed.
   *
   * @param {React.MouseEvent<HTMLButtonElement> | null} event The event source of the callback.
   * @param {number} page The page selected.
   */
  onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void;
  /**
   * Callback fired when the number of rows per page is changed.
   *
   * @param {React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>} event The event source of the callback.
   */
  onRowsPerPageChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  /**
   * The zero-based index of the current page.
   */
  page: number;
  /**
   * The number of rows per page.
   *
   * Set -1 to display all the rows.
   */
  rowsPerPage: number;
  /**
   * Customizes the options of the rows per page select field. If less than two options are
   * available, no select field will be displayed.
   * Use -1 for the value with a custom label to show all the rows.
   * @default [10, 25, 50, 100]
   */
  rowsPerPageOptions?: Array<number | { value: number; label: string }>;
  /**
   * Id of the select element within the pagination.
   */
  selectId?: string;
}

export interface TablePaginationUnstyledSlots {
  /**
   * The component used to render the root.
   * @default 'td'
   */
  root?: React.ElementType;
  /**
   * The component used to render the actions.
   * @default TablePaginationActionsUnstyled
   */
  actions?: React.ElementType;
  /**
   * The component used to render the select.
   * @default 'select'
   */
  select?: React.ElementType;
  /**
   * The component used to render the select label.
   * @default 'p'
   */
  selectLabel?: React.ElementType;
  /**
   * The component used to render the menu item.
   * @default 'option'
   */
  menuItem?: React.ElementType;
  /**
   * The component used to render the displayed rows.
   * @default 'p'
   */
  displayedRows?: React.ElementType;
  /**
   * The component used to render the toolbar.
   * @default 'div'
   */
  toolbar?: React.ElementType;
  /**
   * The component used to render the spacer.
   * @default 'div'
   */
  spacer?: React.ElementType;
}

export interface TablePaginationUnstyledTypeMap<P = {}, D extends React.ElementType = 'td'> {
  props: P & TablePaginationUnstyledOwnProps;
  defaultComponent: D;
}

export type TablePaginationUnstyledProps<
  D extends React.ElementType = TablePaginationUnstyledTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<TablePaginationUnstyledTypeMap<P, D>, D> & {
  component?: D;
};

export type TablePaginationUnstyledOwnerState = TablePaginationUnstyledProps;

export type TablePaginationUnstyledRootSlotProps = {
  children?: React.ReactNode;
  className?: string;
  colSpan?: number;
  ownerState: TablePaginationUnstyledOwnerState;
  ref?: React.Ref<any>;
};

export type TablePaginationUnstyledSelectSlotProps = {
  ['aria-label']: string;
  ['aria-labelledby']?: string;
  children?: React.ReactNode;
  className?: string;
  id?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  ownerState: TablePaginationUnstyledOwnerState;
  value: React.SelectHTMLAttributes<HTMLSelectElement>['value'];
};

export type TablePaginationUnstyledActionsSlotProps = {
  className?: string;
  count: number;
  getItemAriaLabel: (type: ItemAriaLabelType) => string;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void;
  ownerState: TablePaginationUnstyledOwnerState;
  page: number;
  rowsPerPage: number;
};

export type TablePaginationUnstyledMenuItemSlotProps = {
  children?: React.ReactNode;
  className?: string;
  ownerState: TablePaginationUnstyledOwnerState;
  value: React.SelectHTMLAttributes<HTMLSelectElement>['value'];
};

export type TablePaginationUnstyledSelectLabelSlotProps = {
  children?: React.ReactNode;
  className?: string;
  id?: string;
  ownerState: TablePaginationUnstyledOwnerState;
};

export type TablePaginationUnstyledDisplayedRowsSlotProps = {
  children?: React.ReactNode;
  className?: string;
  ownerState: TablePaginationUnstyledOwnerState;
};

export type TablePaginationUnstyledToolbarSlotProps = {
  children?: React.ReactNode;
  className?: string;
  ownerState: TablePaginationUnstyledOwnerState;
};

export type TablePaginationUnstyledSpacerSlotProps = {
  className?: string;
  ownerState: TablePaginationUnstyledOwnerState;
};
