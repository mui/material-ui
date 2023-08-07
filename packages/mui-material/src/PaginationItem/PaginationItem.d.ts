import * as React from 'react';
import { OverridableStringUnion } from '@mui/types';
import { SxProps } from '@mui/system';
import { OverridableComponent, OverrideProps } from '@mui/material/OverridableComponent';
import { Theme } from '../styles';
import { UsePaginationItem } from '../usePagination/usePagination';
import { PaginationItemClasses } from './paginationItemClasses';

export interface PaginationItemPropsVariantOverrides {}

export interface PaginationItemPropsSizeOverrides {}

export interface PaginationItemPropsColorOverrides {}

export interface PaginationItemTypeMap<
  AdditionalProps = {},
  DefaultComponent extends React.ElementType = 'div',
> {
  props: AdditionalProps & {
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<PaginationItemClasses>;
    /**
     * The active color.
     * It supports both default and custom theme colors, which can be added as shown in the
     * [palette customization guide](https://mui.com/material-ui/customization/palette/#adding-new-colors).
     * @default 'standard'
     */
    color?: OverridableStringUnion<
      'standard' | 'primary' | 'secondary',
      PaginationItemPropsColorOverrides
    >;
    /**
     * The components used for each slot inside.
     *
     * This prop is an alias for the `slots` prop.
     * It's recommended to use the `slots` prop instead.
     *
     * @default {}
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
     * The components used for each slot inside.
     *
     * This prop is an alias for the `components` prop, which will be deprecated in the future.
     *
     * @default {}
     */
    slots?: {
      first?: React.ElementType;
      last?: React.ElementType;
      next?: React.ElementType;
      previous?: React.ElementType;
    };
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
  defaultComponent: DefaultComponent;
}

/**
 *
 * Demos:
 *
 * - [Pagination](https://mui.com/material-ui/react-pagination/)
 *
 * API:
 *
 * - [PaginationItem API](https://mui.com/material-ui/api/pagination-item/)
 */
declare const PaginationItem: OverridableComponent<PaginationItemTypeMap>;

export type PaginationItemProps<
  RootComponent extends React.ElementType = PaginationItemTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<PaginationItemTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export default PaginationItem;
