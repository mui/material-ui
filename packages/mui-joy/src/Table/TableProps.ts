import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { ColorPaletteProp, VariantProp, SxProps, ApplyColorInversion } from '../styles/types';
import { SlotProps, CreateSlotsAndSlotProps } from '../utils/types';

export type TableSlot = 'root';

export interface TableSlots {
  /**
   * The component that renders the root.
   * @default 'table'
   */
  root?: React.ElementType;
}

export type TableSlotsAndSlotProps = CreateSlotsAndSlotProps<
  TableSlots,
  {
    root: SlotProps<'table', {}, TableOwnerState>;
  }
>;

export interface TablePropsSizeOverrides {}
export interface TablePropsColorOverrides {}
export interface TablePropsVariantOverrides {}
export interface TablePropsBorderAxisOverrides {}

export interface TableTypeMap<P = {}, D extends React.ElementType = 'table'> {
  props: P & {
    /**
     * The axis to display a border on the table cell.
     * @default 'xBetween'
     */
    borderAxis?: OverridableStringUnion<
      'none' | 'x' | 'xBetween' | 'y' | 'yBetween' | 'both' | 'bothBetween',
      TablePropsBorderAxisOverrides
    >;
    /**
     * Children of the table
     */
    children?: React.ReactNode;
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'neutral'
     */
    color?: OverridableStringUnion<ColorPaletteProp, TablePropsColorOverrides>;
    /**
     * If `true`, the table row will shade on hover.
     * @default false
     */
    hoverRow?: boolean;
    /**
     * If `true`, the body cells will not wrap, but instead will truncate with a text overflow ellipsis.
     *
     * Note: Header cells are always truncated with overflow ellipsis.
     *
     * @default false
     */
    noWrap?: boolean;
    /**
     * The size of the component.
     * It accepts theme values between 'sm' and 'lg'.
     * @default 'md'
     */
    size?: OverridableStringUnion<'sm' | 'md' | 'lg', TablePropsSizeOverrides>;
    /**
     * If `true`, the header always appear at the top of the overflow table.
     * @default false
     */
    stickyHeader?: boolean;
    /**
     * If `true`, the footer always appear at the bottom of the overflow table.
     * @default false
     */
    stickyFooter?: boolean;
    /**
     * The odd or even row of the table body will have subtle background color.
     */
    stripe?: 'odd' | 'even' | (string & Record<never, never>);
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
    /**
     * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
     * @default 'plain'
     */
    variant?: OverridableStringUnion<VariantProp, TablePropsVariantOverrides>;
  } & TableSlotsAndSlotProps;
  defaultComponent: D;
}

export type TableProps<
  D extends React.ElementType = TableTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<TableTypeMap<P, D>, D>;

export interface TableOwnerState extends ApplyColorInversion<TableProps> {}
