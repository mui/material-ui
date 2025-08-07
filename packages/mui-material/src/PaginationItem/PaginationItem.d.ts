import * as React from 'react';
import { OverridableStringUnion } from '@mui/types';
import { SxProps } from '@mui/system';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { Theme } from '../styles';
import { UsePaginationItem } from '../usePagination/usePagination';
import { PaginationItemClasses } from './paginationItemClasses';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';

export interface PaginationItemPropsVariantOverrides {}

export interface PaginationItemPropsSizeOverrides {}

export interface PaginationItemPropsColorOverrides {}

export interface PaginationItemFirstSlotPropsOverrides {}
export interface PaginationItemLastSlotPropsOverrides {}
export interface PaginationItemNextSlotPropsOverrides {}
export interface PaginationItemPreviousSlotPropsOverrides {}

export interface PaginationItemSlots {
  /**
   * The component that renders the first page slot.
   * @default FirstPageIcon
   */
  first: React.ElementType;
  /**
   * The component that renders the last page slot.
   * @default LastPageIcon
   */
  last: React.ElementType;
  /**
   * The component that renders the next page slot.
   * @default NavigateNextIcon
   */
  next: React.ElementType;
  /**
   * The component that renders the previous page slot.
   * @default NavigateBeforeIcon
   */
  previous: React.ElementType;
}

export type PaginationItemSlotsAndSlotProps = CreateSlotsAndSlotProps<
  PaginationItemSlots,
  {
    /**
     * Props forwarded to the first page slot.
     * By default, the available props are based on svg element.
     */
    first: SlotProps<
      React.ElementType<React.HTMLProps<HTMLElement>>,
      PaginationItemFirstSlotPropsOverrides,
      PaginationItemOwnerState
    >;
    /**
     * Props forwarded to the last page slot.
     * By default, the available props are based on svg element.
     */
    last: SlotProps<
      React.ElementType<React.HTMLProps<HTMLElement>>,
      PaginationItemLastSlotPropsOverrides,
      PaginationItemOwnerState
    >;
    /**
     * Props forwarded to the next page slot.
     * By default, the available props are based on svg element.
     */
    next: SlotProps<
      React.ElementType<React.HTMLProps<HTMLElement>>,
      PaginationItemNextSlotPropsOverrides,
      PaginationItemOwnerState
    >;
    /**
     * Props forwarded to the previous page slot.
     * By default, the available props are based on svg element.
     */
    previous: SlotProps<
      React.ElementType<React.HTMLProps<HTMLElement>>,
      PaginationItemPreviousSlotPropsOverrides,
      PaginationItemOwnerState
    >;
  }
>;

export interface PaginationItemOwnerState extends PaginationItemProps {}

export interface PaginationItemOwnProps extends PaginationItemSlotsAndSlotProps {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<PaginationItemClasses>;
  /**
   * The active color.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
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
   * @deprecated use the `slots` prop instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
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
}

export interface PaginationItemTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'div',
> {
  props: AdditionalProps & PaginationItemOwnProps;
  defaultComponent: RootComponent;
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
 * - inherits [ButtonBase API](https://mui.com/material-ui/api/button-base/)
 */
declare const PaginationItem: OverridableComponent<PaginationItemTypeMap>;

export type PaginationItemProps<
  RootComponent extends React.ElementType = PaginationItemTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<PaginationItemTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export default PaginationItem;
