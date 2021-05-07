import * as React from 'react';
import { OverridableStringUnion } from '@material-ui/types';
import { OverridableComponent, OverrideProps } from '@material-ui/core/OverridableComponent';
import { SxProps } from '@material-ui/system';
import { Theme } from '../styles';
import { UsePaginationItem } from '../usePagination/usePagination';

export interface PaginationItemPropsVariantOverrides {}

export interface PaginationItemPropsSizeOverrides {}

export interface PaginationItemPropsColorOverrides {}

export interface PaginationItemTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: {
      /** Styles applied to the root element. */
      root?: string;
      /** Styles applied to the root element if `type="page"`. */
      page?: string;
      /** Styles applied to the root element if `size="small"`. */
      sizeSmall?: string;
      /** Styles applied to the root element if `size="large"`. */
      sizeLarge?: string;
      /** Styles applied to the root element if `variant="text"`. */
      text?: string;
      /** Styles applied to the root element if `variant="text"` and `color="primary"`. */
      textPrimary?: string;
      /** Styles applied to the root element if `variant="text"` and `color="secondary"`. */
      textSecondary?: string;
      /** Styles applied to the root element if `variant="outlined"`. */
      outlined?: string;
      /** Styles applied to the root element if `variant="outlined"` and `color="primary"`. */
      outlinedPrimary?: string;
      /** Styles applied to the root element if `variant="outlined"` and `color="secondary"`. */
      outlinedSecondary?: string;
      /** Styles applied to the root element if `rounded="true"`. */
      rounded?: string;
      /** Styles applied to the root element if `type="start-ellipsis"` or `type="end-ellipsis"`. */
      ellipsis?: string;
      /** Styles applyed to the root element if `type="first"` or type="last". */
      firstLast?: string;
      /** Styles applyed to the root element if `type="previous"` or type="next". */
      previousNext?: string;
      /** Pseudo-class applied to the root element if keyboard focused. */
      focusVisible?: string;
      /** Pseudo-class applied to the root element if `disabled={true}`. */
      disabled?: string;
      /** Pseudo-class applied to the root element if `selected={true}`. */
      selected?: string;
      /** Styles applied to the icon to display. */
      icon?: string;
    };
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

export type PaginationItemClassKey = keyof NonNullable<PaginationItemTypeMap['props']['classes']>;

export type PaginationItemProps<
  D extends React.ElementType = PaginationItemTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<PaginationItemTypeMap<P, D>, D>;

export default PaginationItem;
