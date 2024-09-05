import * as React from 'react';
import { OverrideProps, OverridableStringUnion } from '@mui/types';
import { ApplyColorInversion, ColorPaletteProp, SxProps } from '../styles/types';
import { SlotProps, CreateSlotsAndSlotProps } from '../utils/types';

export type FormControlSlot = 'root';

export interface FormControlSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType;
}

export type FormControlSlotsAndSlotProps = CreateSlotsAndSlotProps<
  FormControlSlots,
  {
    root: SlotProps<'div', {}, FormControlOwnerState>;
  }
>;

export interface FormControlPropsColorOverrides {}
export interface FormControlPropsSizeOverrides {}

export interface FormControlTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     */
    color?: OverridableStringUnion<ColorPaletteProp, FormControlPropsColorOverrides>;
    /**
     * If `true`, the children are in disabled state.
     * @default false
     */
    disabled?: boolean;
    /**
     * If `true`, the children will indicate an error.
     * @default false
     */
    error?: boolean;
    /**
     * The content direction flow.
     * @default 'vertical'
     */
    orientation?: 'vertical' | 'horizontal';
    /**
     * If `true`, the user must specify a value for the input before the owning form can be submitted.
     * If `true`, the asterisk appears on the FormLabel.
     * @default false
     */
    required?: boolean;
    /**
     * The size of the component.
     * @default 'md'
     */
    size?: OverridableStringUnion<'sm' | 'md' | 'lg', FormControlPropsSizeOverrides>;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
  } & FormControlSlotsAndSlotProps;
  defaultComponent: D;
}

export type FormControlProps<
  D extends React.ElementType = FormControlTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<FormControlTypeMap<P, D>, D>;

export interface FormControlOwnerState extends ApplyColorInversion<FormControlProps> {}
