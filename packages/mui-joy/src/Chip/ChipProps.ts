import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { ColorPaletteProp, VariantProp, SxProps } from '../styles/types';

export type ChipSlot = 'root' | 'label' | 'action' | 'startDecorator' | 'endDecorator';

export interface ChipPropsColorOverrides {}
export interface ChipPropsSizeOverrides {}
export interface ChipPropsVariantOverrides {}

export interface ChipTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * The props used for each slot inside the Input.
     * @default {}
     */
    componentsProps?: {
      root?: JSX.IntrinsicElements['div'];
      label?: JSX.IntrinsicElements['span'];
      action?: React.HTMLAttributes<HTMLElement> & {
        href?: string;
        component?: React.ElementType;
        ref?: React.Ref<HTMLElement>;
      };
      startDecorator?: JSX.IntrinsicElements['span'];
      endDecorator?: JSX.IntrinsicElements['span'];
    };
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'primary'
     */
    color?: OverridableStringUnion<ColorPaletteProp, ChipPropsColorOverrides>;
    /**
     * If `true`, the component is disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * Element placed after the children.
     */
    endDecorator?: React.ReactNode;
    /**
     * The size of the component.
     * It accepts theme values between 'sm' and 'lg'.
     * @default 'md'
     */
    size?: OverridableStringUnion<'sm' | 'md' | 'lg', ChipPropsSizeOverrides>;
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
     * @default 'solid'
     */
    variant?: OverridableStringUnion<VariantProp, ChipPropsVariantOverrides>;
  };
  defaultComponent: D;
}

export type ChipProps<
  D extends React.ElementType = ChipTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<ChipTypeMap<P, D>, D>;
