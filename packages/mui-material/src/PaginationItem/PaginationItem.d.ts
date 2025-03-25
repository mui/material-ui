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

export interface PaginationItemSlots {
  first: React.ElementType;
  last: React.ElementType;
  next: React.ElementType;
  previous: React.ElementType;
}

export type PaginationItemSlotsAndSlotProps = CreateSlotsAndSlotProps<
  PaginationItemSlots,
  {
    first: SlotProps<React.ElementType<React.HTMLProps<HTMLElement>>, {}, PaginationItemOwnerState>;
    last: SlotProps<React.ElementType<React.HTMLProps<HTMLElement>>, {}, PaginationItemOwnerState>;
    next: SlotProps<React.ElementType<React.HTMLProps<HTMLElement>>, {}, PaginationItemOwnerState>;
    previous: SlotProps<
      React.ElementType<React.HTMLProps<HTMLElement>>,
      {},
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
   * @deprecated use the `slots` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
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
 */
declare const PaginationItem: OverridableComponent<PaginationItemTypeMap>;

export type PaginationItemProps<
  RootComponent extends React.ElementType = PaginationItemTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<PaginationItemTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export default PaginationItem;
