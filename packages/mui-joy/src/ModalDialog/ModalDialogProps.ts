import * as React from 'react';
import { Breakpoint } from '@mui/system';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { ColorPaletteProp, SxProps, VariantProp, ApplyColorInversion } from '../styles/types';
import { SlotProps, CreateSlotsAndSlotProps } from '../utils/types';

export type ModalDialogSlot = 'root';

export interface ModalDialogSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType;
}

export type ModalDialogSlotsAndSlotProps = CreateSlotsAndSlotProps<
  ModalDialogSlots,
  {
    root: SlotProps<'div', {}, ModalDialogOwnerState>;
  }
>;

export interface ModalDialogPropsColorOverrides {}
export interface ModalDialogPropsVariantOverrides {}
export interface ModalDialogPropsSizeOverrides {}
export interface ModalDialogPropsLayoutOverrides {}

export interface ModalDialogTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'neutral'
     */
    color?: OverridableStringUnion<ColorPaletteProp, ModalDialogPropsColorOverrides>;
    /**
     * If `true`, the children with an implicit color prop invert their colors to match the component's variant and color.
     * @default false
     */
    invertedColors?: boolean;
    /**
     * The maximum width of the component.
     * @example 'md' will use the theme's `md` breakpoint value
     * @example 360 is the number of pixels
     * @example '60ch' can be any valid CSS max-width unit
     */
    maxWidth?: Breakpoint | number | string;
    /**
     * The minimum width of the component.
     * @example 'md' will use the theme's `md` breakpoint value
     * @example 360 is the number of pixels
     * @example '60ch' can be any valid CSS min-width unit
     */
    minWidth?: Breakpoint | number | string;
    /**
     * The layout of the dialog
     * @default 'center'
     */
    layout?: OverridableStringUnion<'center' | 'fullscreen', ModalDialogPropsLayoutOverrides>;
    /**
     * The component orientation.
     * @default 'vertical'
     */
    orientation?: 'horizontal' | 'vertical';
    /**
     * The size of the component.
     * @default 'md'
     */
    size?: OverridableStringUnion<'sm' | 'md' | 'lg', ModalDialogPropsSizeOverrides>;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
    /**
     * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
     * @default 'outlined'
     */
    variant?: OverridableStringUnion<VariantProp, ModalDialogPropsVariantOverrides>;
  } & ModalDialogSlotsAndSlotProps;
  defaultComponent: D;
}

export type ModalDialogProps<
  D extends React.ElementType = ModalDialogTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<ModalDialogTypeMap<P, D>, D>;

export interface ModalDialogOwnerState extends ApplyColorInversion<ModalDialogProps> {}
