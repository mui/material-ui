import * as React from 'react';
import { OverrideProps } from '@mui/types';

export interface TablePaginationActionsUnstyledComponentsPropsOverrides {}

interface TablePaginationActionsUnstyledOwnProps extends React.HTMLAttributes<HTMLDivElement> {
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
  components?: {
    Root?: React.ElementType;
    FirstButton?: React.ElementType;
    LastButton?: React.ElementType;
    NextButton?: React.ElementType;
    BackButton?: React.ElementType;
    FirstPageIcon?: React.ElementType;
    LastPageIcon?: React.ElementType;
    NextPageIcon?: React.ElementType;
    BackPageIcon?: React.ElementType;
  };
  /**
   * The props used for each slot inside the TablePagination.
   * @default {}
   */
  componentsProps?: {
    root?: React.ComponentPropsWithRef<'div'> &
      TablePaginationActionsUnstyledComponentsPropsOverrides;
    firstButton?: React.ComponentPropsWithRef<'button'> &
      TablePaginationActionsUnstyledComponentsPropsOverrides;
    lastButton?: React.ComponentPropsWithRef<'button'> &
      TablePaginationActionsUnstyledComponentsPropsOverrides;
    nextButton?: React.ComponentPropsWithRef<'button'> &
      TablePaginationActionsUnstyledComponentsPropsOverrides;
    backButton?: React.ComponentPropsWithRef<'button'> &
      TablePaginationActionsUnstyledComponentsPropsOverrides;
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
   * For localization purposes, you can use the provided [translations](/guides/localization/).
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

type TablePaginationActionsUnstyledProps<
  D extends React.ElementType = TablePaginationActionsUnstyledTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<TablePaginationActionsUnstyledTypeMap<P, D>, D> & {
  /**
   * The component used for the Root slot.
   * Either a string to use a HTML element or a component.
   * This is equivalent to `components.Root`. If both are provided, the `component` is used.
   */
  component?: D;
};

export interface TablePaginationActionsUnstyledTypeMap<
  P = {},
  D extends React.ElementType = 'button',
> {
  props: P & TablePaginationActionsUnstyledOwnProps;
  defaultComponent: D;
}

export default TablePaginationActionsUnstyledProps;
