import * as React from 'react';
import { StandardProps } from '@material-ui/core';
import { UsePaginationItem } from './usePagination';

export interface PaginationProps
  extends StandardProps<React.HTMLAttributes<HTMLElement>, PaginationClassKey, 'onChange'> {
  /**
   * Number of always visible pages at the beginning and end.
   */
  boundaryCount?: number;
  /**
   * The active color.
   */
  color?: 'default' | 'primary' | 'secondary';
  /**
   * The total number of pages.
   */
  count?: number;
  /**
   * The page selected by default when the component is uncontrolled.
   */
  defaultPage?: number;
  /**
   * If `true`, the pagination component will be disabled.
   */
  disabled?: boolean;
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current page.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   *
   * @param {string} type The link or button type to format ('page' | 'first' | 'last' | 'next' | 'previous'). Defaults to 'page'.
   * @param {number} page The page number to format.
   * @param {bool} selected If true, the current page is selected.
   * @returns {string}
   */
  getItemAriaLabel?: (
    type: 'page' | 'first' | 'last' | 'next' | 'previous',
    page: number,
    selected: boolean,
  ) => string;
  /**
   * If `true`, hide the next-page button.
   */
  hideNextButton?: boolean;
  /**
   * If `true`, hide the previous-page button.
   */
  hidePrevButton?: boolean;
  /**
   * Callback fired when the page is changed.
   *
   * @param {object} event The event source of the callback.
   * @param {number} page The page selected.
   */
  onChange?: (event: React.ChangeEvent<unknown>, page: number) => void;
  /**
   * The current page.
   */
  page?: number;
  /**
   * The pagination item component to render.
   *
   * @param {object} params The props to spread on the component.
   * @returns {ReactNode}
   */
  renderItem?: (params: object) => React.ReactNode;
  /**
   * The shape of the pagination items.
   */
  shape?: 'round' | 'rounded';
  /**
   * If `true`, show the first-page button.
   */
  showFirstButton?: boolean;
  /**
   * If `true`, show the last-page button.
   */
  showLastButton?: boolean;
  /**
   * Number of always visible pages before and after the current page.
   */
  siblingCount?: number;
  /**
   * The size of the pagination component.
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * The variant to use.
   */
  variant?: 'text' | 'outlined';
}

export type PaginationClassKey = 'root' | 'ul';

export default function Pagination(props: PaginationProps): JSX.Element;
