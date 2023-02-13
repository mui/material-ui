import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { SlotComponentProps } from '../utils';

export interface TablePaginationActionsUnstyledRootSlotPropsOverrides {}
export interface TablePaginationActionsUnstyledFirstButtonSlotPropsOverrides {}
export interface TablePaginationActionsUnstyledLastButtonSlotPropsOverrides {}
export interface TablePaginationActionsUnstyledNextButtonSlotPropsOverrides {}
export interface TablePaginationActionsUnstyledBackButtonSlotPropsOverrides {}

export interface TablePaginationActionsUnstyledOwnProps {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {};
  count: number;
  /**
   * The components used for each slot inside the TablePagination.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots?: {
    root?: React.ElementType;
    firstButton?: React.ElementType;
    lastButton?: React.ElementType;
    nextButton?: React.ElementType;
    backButton?: React.ElementType;
    firstPageIcon?: React.ElementType;
    lastPageIcon?: React.ElementType;
    nextPageIcon?: React.ElementType;
    backPageIcon?: React.ElementType;
  };
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
