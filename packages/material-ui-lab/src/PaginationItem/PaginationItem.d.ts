import * as React from 'react';
import { OverridableComponent, OverrideProps } from '@material-ui/core/OverridableComponent';
import { UsePaginationItem } from '../Pagination/usePagination';

export interface PaginationItemTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * The active color.
     */
    color?: 'standard' | 'primary' | 'secondary';
    /**
     * If `true`, the item will be disabled.
     */
    disabled?: boolean;
    /**
     * The current page number.
     */
    page?: number;
    /**
     * If `true` the pagination item is selected.
     */
    selected?: boolean;
    /**
     * The shape of the pagination item.
     */
    shape?: 'round' | 'rounded';
    /**
     * The size of the pagination item.
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * The type of pagination item.
     */
    type?: UsePaginationItem['type'];
    /**
     * The pagination item variant.
     */
    variant?: 'text' | 'outlined';
  };
  defaultComponent: D;
  classKey: PaginationItemClassKey;
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

export type PaginationItemClassKey =
  | 'root'
  | 'page'
  | 'sizeSmall'
  | 'sizeLarge'
  | 'textPrimary'
  | 'textSecondary'
  | 'outlined'
  | 'outlinedPrimary'
  | 'outlinedSecondary'
  | 'rounded'
  | 'ellipsis'
  | 'focusVisible'
  | 'disabled'
  | 'selected'
  | 'icon';

export type PaginationItemProps<
  D extends React.ElementType = PaginationItemTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<PaginationItemTypeMap<P, D>, D>;

export default PaginationItem;
