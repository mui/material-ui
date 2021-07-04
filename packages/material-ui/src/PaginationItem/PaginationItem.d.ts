import * as React from 'react';
import { OverridableStringUnion } from '@material-ui/types';
import { OverridableComponent, OverrideProps } from '@material-ui/core/OverridableComponent';
import { SxProps } from '@material-ui/system';
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
     * @default 'standard'
     */
    color?: OverridableStringUnion<
      'standard' | 'primary' | 'secondary',
      PaginationItemPropsColorOverrides
    >;
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
 * - [Pagination](https://material-ui.com/components/pagination/)
 *
 * API:
 *
 * - [PaginationItem API](https://material-ui.com/api/pagination-item/)
 */
declare const PaginationItem: OverridableComponent<PaginationItemTypeMap>;

export type PaginationItemProps<
  D extends React.ElementType = PaginationItemTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<PaginationItemTypeMap<P, D>, D>;

export default PaginationItem;
