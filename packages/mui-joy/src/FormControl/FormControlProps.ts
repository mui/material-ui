import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { NativeFormControlElement } from '@mui/base/FormControlUnstyled';
import { SxProps } from '../styles/defaultTheme';
import { ColorPaletteProp, VariantProp } from '../styles/types';

export type FormControlSlot = 'root';

export interface FormControlPropsVariantOverrides {}

export interface FormControlPropsColorOverrides {}

export interface FormControlPropsSizeOverrides {}

export interface FormControlTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * Class name applied to the root element.
     */
    className?: string;
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     */
    color?: OverridableStringUnion<
      Exclude<ColorPaletteProp, 'context'>,
      FormControlPropsColorOverrides
    >;
    defaultValue?: unknown;
    /**
     * If `true`, the label, input and helper text should be displayed in a disabled state.
     * @default false
     */
    disabled?: boolean;
    /**
     * If `true`, the label is displayed in an error state.
     * @default false
     */
    error?: boolean;
    /**
     * If `true`, the component is displayed in focused state.
     * @default false
     */
    focused?: boolean;
    onChange?: React.ChangeEventHandler<NativeFormControlElement>;
    /**
     * If `true`, the label will indicate that the `input` is required.
     * @default false
     */
    required?: boolean;
    /**
     * The size of the component.
     */
    size?: OverridableStringUnion<'sm' | 'md' | 'lg', FormControlPropsSizeOverrides>;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
    value?: unknown;
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
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<FormControlTypeMap<P, D>, D>;
