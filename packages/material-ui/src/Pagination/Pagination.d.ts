import * as React from 'react';
import { OverridableStringUnion } from '@material-ui/types';
import { InternalStandardProps as StandardProps } from '@material-ui/core';
import { UsePaginationItem, UsePaginationProps } from '../usePagination/usePagination';

export interface PaginationRenderItemParams extends UsePaginationItem {
  color: PaginationProps['color'];
  shape: PaginationProps['shape'];
  size: PaginationProps['size'];
  variant: PaginationProps['variant'];
}

export interface PaginationPropsVariantOverrides {}
export type PaginationVariantDefaults = Record<'text' | 'outlined', true>;

export interface PaginationProps
  extends UsePaginationProps,
    StandardProps<React.HTMLAttributes<HTMLElement>, 'children' | 'onChange'> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    /** Styles applied to the root element. */
    root?: string;
    /** Styles applied to the ul element. */
    ul?: string;
    /** Styles applied to the root element if `variant="outlined"`. */
    outlined?: string;
    /** Styles applied to the root element if `variant="text"`. */
    text?: string;
  };
  /**
   * The active color.
   * @default 'standard'
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
   * @default (item) => <PaginationItem {...item} />
   */
  renderItem?: (params: PaginationRenderItemParams) => React.ReactNode;
  /**
   * The shape of the pagination items.
   * @default 'circular'
   */
  shape?: 'circular' | 'rounded';
  /**
   * The size of the pagination component.
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * The variant to use.
   * @default 'text'
   */
  variant?: OverridableStringUnion<PaginationVariantDefaults, PaginationPropsVariantOverrides>;
}

export type PaginationClassKey = keyof NonNullable<PaginationProps['classes']>;

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
