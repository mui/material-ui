import * as React from 'react';
import { PolymorphicProps, SlotComponentProps } from '../utils';

export interface TablePaginationActionsRootSlotPropsOverrides {}
export interface TablePaginationActionsFirstButtonSlotPropsOverrides {}
export interface TablePaginationActionsLastButtonSlotPropsOverrides {}
export interface TablePaginationActionsNextButtonSlotPropsOverrides {}
export interface TablePaginationActionsBackButtonSlotPropsOverrides {}

export interface TablePaginationActionsOwnProps {
  count: number;
  /**
   * The components used for each slot inside the TablePagination.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots?: TablePaginationActionsSlots;
  /**
   * The props used for each slot inside the TablePagination.
   * @default {}
   */
  slotProps?: {
    root?: SlotComponentProps<
      'div',
      TablePaginationActionsRootSlotPropsOverrides,
      TablePaginationActionsOwnerState
    >;
    firstButton?: SlotComponentProps<
      'button',
      TablePaginationActionsFirstButtonSlotPropsOverrides,
      TablePaginationActionsOwnerState
    >;
    lastButton?: SlotComponentProps<
      'button',
      TablePaginationActionsLastButtonSlotPropsOverrides,
      TablePaginationActionsOwnerState
    >;
    nextButton?: SlotComponentProps<
      'button',
      TablePaginationActionsNextButtonSlotPropsOverrides,
      TablePaginationActionsOwnerState
    >;
    backButton?: SlotComponentProps<
      'button',
      TablePaginationActionsBackButtonSlotPropsOverrides,
      TablePaginationActionsOwnerState
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

export interface TablePaginationActionsSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType;
  /**
   * The component that renders the first button.
   * @default 'button'
   */
  firstButton?: React.ElementType;
  /**
   * The component that renders the last button.
   * @default 'button'
   */
  lastButton?: React.ElementType;
  /**
   * The component that renders the next button.
   * @default 'button'
   */
  nextButton?: React.ElementType;
  /**
   * The component that renders the back button.
   * @default 'button'
   */
  backButton?: React.ElementType;
  /**
   * The component that renders the first page icon.
   * @default FirstPageIconDefault
   */
  firstPageIcon?: React.ElementType;
  /**
   * The component that renders the last page icon.
   * @default LastPageIconDefault
   */
  lastPageIcon?: React.ElementType;
  /**
   * The component that renders the next page icon.
   * @default NextPageIconDefault
   */
  nextPageIcon?: React.ElementType;
  /**
   * The component that renders the back page icon.
   * @default BackPageIconDefault
   */
  backPageIcon?: React.ElementType;
}

export type TablePaginationActionsProps<
  RootComponentType extends React.ElementType = TablePaginationActionsTypeMap['defaultComponent'],
> = PolymorphicProps<TablePaginationActionsTypeMap<{}, RootComponentType>, RootComponentType>;

export interface TablePaginationActionsTypeMap<
  AdditionalProps = {},
  RootComponentType extends React.ElementType = 'button',
> {
  props: TablePaginationActionsOwnProps & AdditionalProps;
  defaultComponent: RootComponentType;
}

export type TablePaginationActionsOwnerState = TablePaginationActionsOwnProps;

export type TablePaginationActionsRootSlotProps = {
  children?: React.ReactNode;
  ownerState: TablePaginationActionsOwnerState;
  ref: React.Ref<any>;
};

export type TablePaginationActionsButtonSlotProps = {
  'aria-label': string;
  children?: React.ReactNode;
  disabled: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  ownerState: TablePaginationActionsOwnerState;
  title: string;
};
