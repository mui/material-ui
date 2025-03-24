import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '..';
import { ExtendButtonBase, ExtendButtonBaseTypeMap } from '../ButtonBase';
import { OverrideProps } from '../OverridableComponent';
import { TableSortLabelClasses } from './tableSortLabelClasses';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';

export interface TableSortLabelRootSlotPropsOverrides {}

export interface TableSortLabelIconSlotPropsOverrides {}

export interface TableSortLabelSlots {
  /**
   * The component that renders the root slot.
   * @default span
   */
  root?: React.ElementType;
  /**
   * The component that renders the icon slot.
   * @default ArrowDownwardIcon
   */
  icon?: React.ElementType;
}

export type TableSortLabelSlotsAndSlotProps = CreateSlotsAndSlotProps<
  TableSortLabelSlots,
  {
    /**
     * Props forwarded to the root slot.
     */
    root: SlotProps<
      React.ElementType<React.HTMLAttributes<HTMLSpanElement>>,
      TableSortLabelRootSlotPropsOverrides,
      TableSortLabelOwnerState
    >;
    /**
     * Props forwarded to the icon slot.
     */
    icon: SlotProps<
      React.ElementType<React.SVGAttributes<SVGSVGElement>>,
      TableSortLabelIconSlotPropsOverrides,
      TableSortLabelOwnerState
    >;
  }
>;

export interface TableSortLabelOwnerState extends TableSortLabelOwnProps {}

export interface TableSortLabelOwnProps {
  /**
   * If `true`, the label will have the active styling (should be true for the sorted column).
   * @default false
   */
  active?: boolean;
  /**
   * Label contents, the arrow will be appended automatically.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<TableSortLabelClasses>;
  /**
   * The current sort direction.
   * @default 'asc'
   */
  direction?: 'asc' | 'desc';
  /**
   * Hide sort icon when active is false.
   * @default false
   */
  hideSortIcon?: boolean;
  /**
   * Sort icon to use.
   * @default ArrowDownwardIcon
   */
  IconComponent?: React.JSXElementConstructor<{
    className: string;
  }>;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

export type TableSortLabelTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'span',
> = ExtendButtonBaseTypeMap<{
  props: AdditionalProps & TableSortLabelOwnProps & TableSortLabelSlotsAndSlotProps;
  defaultComponent: RootComponent;
}>;

/**
 * A button based label for placing inside `TableCell` for column sorting.
 *
 * Demos:
 *
 * - [Table](https://v6.mui.com/material-ui/react-table/)
 *
 * API:
 *
 * - [TableSortLabel API](https://v6.mui.com/material-ui/api/table-sort-label/)
 * - inherits [ButtonBase API](https://v6.mui.com/material-ui/api/button-base/)
 */
declare const TableSortLabel: ExtendButtonBase<TableSortLabelTypeMap>;

export type TableSortLabelProps<
  RootComponent extends React.ElementType = TableSortLabelTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<TableSortLabelTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export default TableSortLabel;
