import * as React from 'react';
import { OverrideProps, OverridableStringUnion } from '@mui/types';
import { ColorPaletteProp, VariantProp, SxProps, ApplyColorInversion } from '../styles/types';
import { SlotProps, CreateSlotsAndSlotProps } from '../utils/types';

export type AutocompleteListboxSlot = 'root';

export interface AutocompleteListboxSlots {
  /**
   * The component that renders the root.
   * @default 'ul'
   */
  root?: React.ElementType;
}

export type AutocompleteListboxSlotsAndSlotProps = CreateSlotsAndSlotProps<
  AutocompleteListboxSlots,
  {
    root: SlotProps<'ul', {}, AutocompleteListboxOwnerState>;
  }
>;

export interface AutocompleteListboxPropsSizeOverrides {}
export interface AutocompleteListboxPropsColorOverrides {}
export interface AutocompleteListboxPropsVariantOverrides {}

export interface AutocompleteListboxTypeMap<P = {}, D extends React.ElementType = 'ul'> {
  props: P & {
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'neutral'
     */
    color?: OverridableStringUnion<ColorPaletteProp, AutocompleteListboxPropsColorOverrides>;
    /**
     * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
     * @default 'outlined'
     */
    variant?: OverridableStringUnion<VariantProp, AutocompleteListboxPropsVariantOverrides>;
    /**
     * The size of the component (affect other nested list* components).
     * @default 'md'
     */
    size?: OverridableStringUnion<'sm' | 'md' | 'lg', AutocompleteListboxPropsSizeOverrides>;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
  } & AutocompleteListboxSlotsAndSlotProps;
  defaultComponent: D;
}

export type AutocompleteListboxProps<
  D extends React.ElementType = AutocompleteListboxTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<AutocompleteListboxTypeMap<P, D>, D>;

export interface AutocompleteListboxOwnerState
  extends ApplyColorInversion<AutocompleteListboxProps> {}
