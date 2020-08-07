import * as React from 'react';
import { StandardProps } from '@material-ui/core';
import { UsePaginationItem, UsePaginationProps } from './usePagination';

export interface PaginationRenderItemParams extends UsePaginationItem {
  color: PaginationProps['color'];
  shape: PaginationProps['shape'];
  size: PaginationProps['size'];
  variant: PaginationProps['variant'];
}

export interface PaginationProps
  extends UsePaginationProps,
    StandardProps<React.HTMLAttributes<HTMLElement>, PaginationClassKey, 'children' | 'onChange'> {
  /**
   * The active color.
   */
  color?: 'primary' | 'secondary' | 'standard';
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
    selected: boolean
  ) => string;
  /**
   * Render the item.
   *
   * @param {PaginationRenderItemParams} params The props to spread on a PaginationItem.
   * @returns {ReactNode}
   */
  renderItem?: (params: PaginationRenderItemParams) => React.ReactNode;
  /**
   * The shape of the pagination items.
   */
  shape?: 'round' | 'rounded';
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

/**
 *
 * Demos:
 *
 * - [Pagination](https://material-ui.com/components/pagination/)
 *
 * API:
 *
 * - [Pagination API](https://material-ui.com/api/pagination/)
 */
export default function Pagination(props: PaginationProps): JSX.Element;
