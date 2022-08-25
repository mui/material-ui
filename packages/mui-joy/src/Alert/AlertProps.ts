import { OverridableStringUnion, OverrideProps } from '@mui/types';
import * as React from 'react';
import { ColorPaletteProp, SxProps, VariantProp } from '../styles/types';

export type AlertSlot = 'root' | 'startDecorator' | 'endDecorator';

export interface AlertPropsVariantOverrides {}
export interface AlertPropsColorOverrides {}
export interface AlertPropsSizeOverrides {}

export interface AlertTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'primary'
     */
    color?: OverridableStringUnion<ColorPaletteProp, AlertPropsColorOverrides>;
    /**
     * Element placed after the children.
     */
    endDecorator?: React.ReactNode;
    /**
     * The ARIA role attribute of the element.
     * @default 'alert'
     */
    role?: string;
    /**
     * The size of the component.
     * @default 'md'
     */
    size?: OverridableStringUnion<'sm' | 'md' | 'lg', AlertPropsSizeOverrides>;
    /**
     * Element placed before the children.
     */
    startDecorator?: React.ReactNode;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
    /**
     * The variant to use.
     * @default 'soft'
     */
    variant?: OverridableStringUnion<VariantProp, AlertPropsVariantOverrides>;
  };
  defaultComponent: D;
}

export type AlertProps<
  D extends React.ElementType = AlertTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<AlertTypeMap<P, D>, D>;
