import * as React from 'react';

export interface UsePaginationProps {
  /**
   * Number of always visible pages at the beginning and end.
   */
  boundaryCount?: number;
  /**
   * The name of the component where this hook is used.
   */
  componentName?: string;
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
}

export interface UsePaginationItem {
  onClick: React.ReactEventHandler;
  type: 'page' | 'first' | 'last' | 'next' | 'previous' | 'start-ellipsis' | 'end-ellipsis';
  page: number;
  selected: boolean;
  disabled: boolean;
}

export default function usePagination(props: UsePaginationProps): UsePaginationItem[];
