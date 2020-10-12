import * as React from 'react';
import { OverridableStringUnion } from '@material-ui/types';
import { OverridableComponent, OverrideProps } from '@material-ui/core/OverridableComponent';
import { UsePaginationItem } from '../usePagination/usePagination';

export interface PaginationItemPropsVariantOverrides {}
export type PaginationItemVariantDefaults = Record<'text' | 'outlined', true>;

export interface PaginationItemTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: {
      root?: string;
      page?: string;
      sizeSmall?: string;
      sizeLarge?: string;
      text?: string;
      textPrimary?: string;
      textSecondary?: string;
      outlined?: string;
      outlinedPrimary?: string;
      outlinedSecondary?: string;
      rounded?: string;
      ellipsis?: string;
      focusVisible?: string;
      disabled?: string;
      selected?: string;
      icon?: string;
    };
    /**
     * The active color.
     * @default 'standard'
     */
    color?: 'standard' | 'primary' | 'secondary';
    /**
     * If `true`, the item will be disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * The current page number.
     */
    page?: number;
    /**
     * If `true` the pagination item is selected.
     * @default false
     */
    selected?: boolean;
    /**
     * The shape of the pagination item.
     * @default 'circular'
     */
    shape?: 'circular' | 'rounded';
    /**
     * The size of the pagination item.
     * @default 'medium'
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * The type of pagination item.
     * @default 'page'
     */
    type?: UsePaginationItem['type'];
    /**
     * The pagination item variant.
     * @default 'text'
     */
    variant?: OverridableStringUnion<
      PaginationItemVariantDefaults,
      PaginationItemPropsVariantOverrides
    >;
  };
  defaultComponent: D;
}

/**
 *
 * Demos:
 *
 * - [Pagination](https://material-ui.com/components/pagination/)
 *
 * API:
 *
 * - [PaginationItem API](https://material-ui.com/api/pagination-item/)
 */
declare const PaginationItem: OverridableComponent<PaginationItemTypeMap>;

export type PaginationItemClassKey = keyof NonNullable<PaginationItemTypeMap['props']['classes']>;

export type PaginationItemProps<
  D extends React.ElementType = PaginationItemTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<PaginationItemTypeMap<P, D>, D>;

export default PaginationItem;
