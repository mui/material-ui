import * as React from 'react';
import { PolymorphicProps, SlotComponentProps } from '../utils';
import { TablePaginationActions } from './TablePaginationActions';
import { ItemAriaLabelType } from './common.types';

export interface LabelDisplayedRowsArgs {
  from: number;
  to: number;
  count: number;
  page: number;
}

export interface TablePaginationRootSlotPropsOverrides {}
export interface TablePaginationActionsSlotPropsOverrides {}
export interface TablePaginationSelectSlotPropsOverrides {}
export interface TablePaginationSelectLabelSlotPropsOverrides {}
export interface TablePaginationMenuItemSlotPropsOverrides {}
export interface TablePaginationDisplayedRowsSlotPropsOverrides {}
export interface TablePaginationToolbarSlotPropsOverrides {}
export interface TablePaginationSpacerSlotPropsOverrides {}

export interface TablePaginationOwnProps {
  /**
   * @ignore
   */
  colSpan?: number;
  /**
   * The components used for each slot inside the TablePagination.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots?: TablePaginationSlots;
  /**
   * The props used for each slot inside the TablePagination.
   * @default {}
   */
  slotProps?: {
    root?: SlotComponentProps<
      'td',
      TablePaginationRootSlotPropsOverrides,
      TablePaginationOwnerState
    >;
    actions?: SlotComponentProps<
      typeof TablePaginationActions,
      TablePaginationActionsSlotPropsOverrides,
      TablePaginationOwnerState
    >;
    select?: SlotComponentProps<
      'select',
      TablePaginationSelectSlotPropsOverrides,
      TablePaginationOwnerState
    >;
    selectLabel?: SlotComponentProps<
      'p',
      TablePaginationSelectLabelSlotPropsOverrides,
      TablePaginationOwnerState
    >;
    menuItem?: SlotComponentProps<
      'option',
      TablePaginationMenuItemSlotPropsOverrides,
      TablePaginationOwnerState
    >;
    displayedRows?: SlotComponentProps<
      'p',
      TablePaginationDisplayedRowsSlotPropsOverrides,
      TablePaginationOwnerState
    >;
    toolbar?: SlotComponentProps<
      'div',
      TablePaginationToolbarSlotPropsOverrides,
      TablePaginationOwnerState
    >;
    spacer?: SlotComponentProps<
      'div',
      TablePaginationSpacerSlotPropsOverrides,
      TablePaginationOwnerState
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
  rowsPerPageOptions?: ReadonlyArray<number | { value: number; label: string }>;
  /**
   * Id of the select element within the pagination.
   */
  selectId?: string;
}

export interface TablePaginationSlots {
  /**
   * The component that renders the root.
   * @default 'td'
   */
  root?: React.ElementType;
  /**
   * The component that renders the actions.
   * @default TablePaginationActions
   */
  actions?: React.ElementType;
  /**
   * The component that renders the select.
   * @default 'select'
   */
  select?: React.ElementType;
  /**
   * The component that renders the select label.
   * @default 'p'
   */
  selectLabel?: React.ElementType;
  /**
   * The component that renders the menu item.
   * @default 'option'
   */
  menuItem?: React.ElementType;
  /**
   * The component that renders the displayed rows.
   * @default 'p'
   */
  displayedRows?: React.ElementType;
  /**
   * The component that renders the toolbar.
   * @default 'div'
   */
  toolbar?: React.ElementType;
  /**
   * The component that renders the spacer.
   * @default 'div'
   */
  spacer?: React.ElementType;
}

export interface TablePaginationTypeMap<
  AdditionalProps = {},
  RootComponentType extends React.ElementType = 'td',
> {
  props: TablePaginationOwnProps & AdditionalProps;
  defaultComponent: RootComponentType;
}

export type TablePaginationProps<
  RootComponentType extends React.ElementType = TablePaginationTypeMap['defaultComponent'],
> = PolymorphicProps<TablePaginationTypeMap<{}, RootComponentType>, RootComponentType>;

export type TablePaginationOwnerState = TablePaginationOwnProps;

export type TablePaginationRootSlotProps = {
  children?: React.ReactNode;
  className?: string;
  colSpan?: number;
  ownerState: TablePaginationOwnerState;
  ref?: React.Ref<any>;
};

export type TablePaginationSelectSlotProps = {
  ['aria-label']: string;
  ['aria-labelledby']?: string;
  children?: React.ReactNode;
  className?: string;
  id?: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  ownerState: TablePaginationOwnerState;
  value: React.SelectHTMLAttributes<HTMLSelectElement>['value'];
};

export type TablePaginationActionsSlotProps = {
  className?: string;
  count: number;
  getItemAriaLabel: (type: ItemAriaLabelType) => string;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void;
  ownerState: TablePaginationOwnerState;
  page: number;
  rowsPerPage: number;
};

export type TablePaginationMenuItemSlotProps = {
  children?: React.ReactNode;
  className?: string;
  ownerState: TablePaginationOwnerState;
  value: React.SelectHTMLAttributes<HTMLSelectElement>['value'];
};

export type TablePaginationSelectLabelSlotProps = {
  children?: React.ReactNode;
  className?: string;
  id?: string;
  ownerState: TablePaginationOwnerState;
};

export type TablePaginationDisplayedRowsSlotProps = {
  children?: React.ReactNode;
  className?: string;
  ownerState: TablePaginationOwnerState;
};

export type TablePaginationToolbarSlotProps = {
  children?: React.ReactNode;
  className?: string;
  ownerState: TablePaginationOwnerState;
};

export type TablePaginationSpacerSlotProps = {
  className?: string;
  ownerState: TablePaginationOwnerState;
};
