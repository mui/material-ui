import * as React from 'react';
import { IconButtonProps } from '../IconButton/IconButton';

export interface TablePaginationActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  backIconButtonProps?: Partial<IconButtonProps>;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {};
  /**
   * The components used for first, last, next & previous item type
   * @default {
   *   first: FirstPageIcon,
   *   last: LastPageIcon,
   *   next: KeyboardArrowRight,
   *   previous: KeyboardArrowLeft,
   * }
   */
  components?: {
    first?: React.ElementType;
    last?: React.ElementType;
    next?: React.ElementType;
    previous?: React.ElementType;
  };
  /**
   * The props used for each slot inside.
   * @default {}
   */
  componentsProps?: {
    first?: React.HTMLProps<HTMLButtonElement>;
    last?: React.HTMLProps<HTMLButtonElement>;
    next?: React.HTMLProps<HTMLButtonElement>;
    previous?: React.HTMLProps<HTMLButtonElement>;
  };
  count: number;
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current page.
   * This is important for screen reader users.
   *
   * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
   * @param {string} type The link or button type to format ('first' | 'last' | 'next' | 'previous').
   * @returns {string}
   */
  getItemAriaLabel: (type: 'first' | 'last' | 'next' | 'previous') => string;
  nextIconButtonProps?: Partial<IconButtonProps>;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void;
  page: number;
  rowsPerPage: number;
  showFirstButton: boolean;
  showLastButton: boolean;
}

declare const TablePaginationActions: React.JSXElementConstructor<TablePaginationActionsProps>;

export default TablePaginationActions;
