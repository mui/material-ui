import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { SlotComponentProps } from '../utils';

export interface TablePaginationActionsUnstyledRootSlotPropsOverrides {}
export interface TablePaginationActionsUnstyledFirstButtonSlotPropsOverrides {}
export interface TablePaginationActionsUnstyledLastButtonSlotPropsOverrides {}
export interface TablePaginationActionsUnstyledNextButtonSlotPropsOverrides {}
export interface TablePaginationActionsUnstyledBackButtonSlotPropsOverrides {}

export interface TablePaginationActionsUnstyledOwnProps {
  count: number;
  /**
   * The components used for each slot inside the TablePagination.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots?: TablePaginationActionsUnstyledSlots;
  /**
   * The props used for each slot inside the TablePagination.
   * @default {}
   */
  slotProps?: {
    root?: SlotComponentProps<
      'div',
      TablePaginationActionsUnstyledRootSlotPropsOverrides,
      TablePaginationActionsUnstyledOwnerState
    >;
    firstButton?: SlotComponentProps<
      'button',
      TablePaginationActionsUnstyledFirstButtonSlotPropsOverrides,
      TablePaginationActionsUnstyledOwnerState
    >;
    lastButton?: SlotComponentProps<
      'button',
      TablePaginationActionsUnstyledLastButtonSlotPropsOverrides,
      TablePaginationActionsUnstyledOwnerState
    >;
    nextButton?: SlotComponentProps<
      'button',
      TablePaginationActionsUnstyledNextButtonSlotPropsOverrides,
      TablePaginationActionsUnstyledOwnerState
    >;
    backButton?: SlotComponentProps<
      'button',
      TablePaginationActionsUnstyledBackButtonSlotPropsOverrides,
      TablePaginationActionsUnstyledOwnerState
    >;
  };
  /**
   * Direction of the text.
   * @default 'ltr'
   */
  direction?: 'ltr' | 'rtl';
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current page.
   * This is important for screen reader users.
   *
   * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
   * @param {string} type The link or button type to format ('first' | 'last' | 'next' | 'previous').
   * @returns {string}
   */
  getItemAriaLabel: (type: 'first' | 'last' | 'next' | 'previous', page: number) => string;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void;
  page: number;
  rowsPerPage: number;
  showFirstButton: boolean;
  showLastButton: boolean;
}

export interface TablePaginationActionsUnstyledSlots {
  /**
   * The component used to render the root.
   * @default 'div'
   */
  root?: React.ElementType;
  /**
   * The component used to render the first button.
   * @default 'button'
   */
  firstButton?: React.ElementType;
  /**
   * The component used to render the last button.
   * @default 'button'
   */
  lastButton?: React.ElementType;
  /**
   * The component used to render the next button.
   * @default 'button'
   */
  nextButton?: React.ElementType;
  /**
   * The component used to render the back button.
   * @default 'button'
   */
  backButton?: React.ElementType;
  /**
   * The component used to render the first page icon.
   * @default FirstPageIconDefault
   */
  firstPageIcon?: React.ElementType;
  /**
   * The component used to render the last page icon.
   * @default LastPageIconDefault
   */
  lastPageIcon?: React.ElementType;
  /**
   * The component used to render the next page icon.
   * @default NextPageIconDefault
   */
  nextPageIcon?: React.ElementType;
  /**
   * The component used to render the back page icon.
   * @default BackPageIconDefault
   */
  backPageIcon?: React.ElementType;
}

export type TablePaginationActionsUnstyledProps<
  D extends React.ElementType = TablePaginationActionsUnstyledTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<TablePaginationActionsUnstyledTypeMap<P, D>, D> & {
  component?: D;
};

export interface TablePaginationActionsUnstyledTypeMap<
  P = {},
  D extends React.ElementType = 'button',
> {
  props: P & TablePaginationActionsUnstyledOwnProps;
  defaultComponent: D;
}

export type TablePaginationActionsUnstyledOwnerState = TablePaginationActionsUnstyledProps;

export type TablePaginationActionsUnstyledRootSlotProps = {
  children?: React.ReactNode;
  ownerState: TablePaginationActionsUnstyledOwnerState;
  ref: React.Ref<any>;
};

export type TablePaginationActionsUnstyledButtonSlotProps = {
  'aria-label': string;
  children?: React.ReactNode;
  disabled: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  ownerState: TablePaginationActionsUnstyledOwnerState;
  title: string;
};
