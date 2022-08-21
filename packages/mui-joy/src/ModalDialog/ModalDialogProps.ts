import { OverridableStringUnion, OverrideProps } from '@mui/types';
import * as React from 'react';
import { ColorPaletteProp, SxProps, VariantProp } from '../styles/types';

export type ModalDialogSlot = 'root';

export interface ModalDialogPropsColorOverrides {}
export interface ModalDialogPropsVariantOverrides {}

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
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
    /**
     * The variant to use.
     * @default 'plain'
     */
    variant?: OverridableStringUnion<VariantProp, ModalDialogPropsVariantOverrides>;
  };
  defaultComponent: D;
}

export type ModalDialogProps<
  D extends React.ElementType = ModalDialogTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<ModalDialogTypeMap<P, D>, D>;
