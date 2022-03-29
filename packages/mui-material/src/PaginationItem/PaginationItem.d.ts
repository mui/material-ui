import * as React from 'react';
import { OverridableStringUnion } from '@mui/types';
import { OverridableComponent, OverrideProps } from '@mui/material/OverridableComponent';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { UsePaginationItem } from '../usePagination/usePagination';
import { PaginationItemClasses } from './paginationItemClasses';

export interface PaginationItemPropsVariantOverrides {}

export interface PaginationItemPropsSizeOverrides {}

export interface PaginationItemPropsColorOverrides {}

export interface PaginationItemTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<PaginationItemClasses>;
    /**
     * The active color.
     * It supports both default and custom theme colors, which can be added as shown in the
     * [palette customization guide](https://mui.com/customization/palette/#adding-new-colors).
     * @default 'standard'
     */
    color?: OverridableStringUnion<
      'standard' | 'primary' | 'secondary',
      PaginationItemPropsColorOverrides
    >;
    /**
     * The components used for first, last, next & previous item type
     * @default {
     *   first: FirstPageIcon,
     *   last: LastPageIcon,
     *   next: NavigateNextIcon,
     *   previous: NavigateBeforeIcon,
     * }
     */
    components?: {
      first?: React.ElementType;
      last?: React.ElementType;
      next?: React.ElementType;
      previous?: React.ElementType;
    };
    /**
     * If `true`, the component is disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * The current page number.
     */
    page?: React.ReactNode;
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
     * The size of the component.
     * @default 'medium'
     */
    size?: OverridableStringUnion<'small' | 'medium' | 'large', PaginationItemPropsSizeOverrides>;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
    /**
     * The type of pagination item.
     * @default 'page'
     */
    type?: UsePaginationItem['type'];
    /**
     * The variant to use.
     * @default 'text'
     */
    variant?: OverridableStringUnion<'text' | 'outlined', PaginationItemPropsVariantOverrides>;
  };
  defaultComponent: D;
}

/**
 *
 * Demos:
 *
 * - [Pagination](https://mui.com/components/pagination/)
 *
 * API:
 *
 * - [PaginationItem API](https://mui.com/api/pagination-item/)
 */
declare const PaginationItem: OverridableComponent<PaginationItemTypeMap>;

export type PaginationItemProps<
  D extends React.ElementType = PaginationItemTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<PaginationItemTypeMap<P, D>, D>;

export default PaginationItem;
