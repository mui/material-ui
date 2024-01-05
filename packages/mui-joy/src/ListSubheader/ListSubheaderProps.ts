import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { ColorPaletteProp, VariantProp, SxProps, ApplyColorInversion } from '../styles/types';
import { SlotProps, CreateSlotsAndSlotProps } from '../utils/types';

export type ListSubheaderSlot = 'root';

export interface ListSubheaderSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType;
}

export type ListSubheaderSlotsAndSlotProps = CreateSlotsAndSlotProps<
  ListSubheaderSlots,
  {
    root: SlotProps<'div', {}, ListSubheaderOwnerState>;
  }
>;

export interface ListSubheaderVariantOverrides {}
export interface ListSubheaderColorOverrides {}

export interface ListSubheaderTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     */
    color?: OverridableStringUnion<ColorPaletteProp, ListSubheaderColorOverrides>;
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
    /**
     * If `true`, the component has sticky position (with top = 0).
     * @default false
     */
    sticky?: boolean;
    /**
     * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
     */
    variant?: OverridableStringUnion<VariantProp, ListSubheaderVariantOverrides>;
  } & ListSubheaderSlotsAndSlotProps;
  defaultComponent: D;
}

export type ListSubheaderProps<
  D extends React.ElementType = ListSubheaderTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<ListSubheaderTypeMap<P, D>, D>;

export interface ListSubheaderOwnerState extends ApplyColorInversion<ListSubheaderProps> {
  /**
   * @internal
   */
  instanceColor?: OverridableStringUnion<ColorPaletteProp, ListSubheaderColorOverrides>;
}
