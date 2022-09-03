import * as React from 'react';
import { OverrideProps, OverridableStringUnion } from '@mui/types';
import { ColorPaletteProp, VariantProp, SxProps } from '../styles/types';

export type FormControlSlot = 'root';

export interface FormControlPropsColorOverrides {}
export interface FormControlPropsVariantOverrides {}
export interface FormControlPropsSizeOverrides {}

export interface FormControlTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'neutral'
     */
    color?: OverridableStringUnion<ColorPaletteProp, FormControlPropsColorOverrides>;
    disabled?: boolean;
    /**
     * If `true`, the children will indicate an error.
     * @default false
     */
    error?: boolean;
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
    /**
     * The variant to use.
     * @default 'outlined'
     */
    variant?: OverridableStringUnion<VariantProp, FormControlPropsVariantOverrides>;
  };
  defaultComponent: D;
}

export type FormControlProps<
  D extends React.ElementType = FormControlTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<FormControlTypeMap<P, D>, D>;

export interface FormControlOwnerState extends FormControlProps {}
