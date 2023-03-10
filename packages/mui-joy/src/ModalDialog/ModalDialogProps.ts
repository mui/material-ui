import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { ColorPaletteProp, SxProps, VariantProp, ApplyColorInversion } from '../styles/types';

export type ModalDialogSlot = 'root';

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
     * The layout of the dialog
     * @default 'center'
     */
    layout?: 'center' | 'fullscreen';
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
  };
  defaultComponent: D;
}

export type ModalDialogProps<
  D extends React.ElementType = ModalDialogTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<ModalDialogTypeMap<P, D>, D>;

export interface ModalDialogOwnerState extends ApplyColorInversion<ModalDialogProps> {}
