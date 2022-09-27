import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { SlotComponentProps } from '@mui/base/utils';
import { ColorPaletteProp, VariantProp, SxProps } from '../styles/types';

export type ChipSlot = 'root' | 'label' | 'action' | 'startDecorator' | 'endDecorator';

export interface ChipPropsColorOverrides {}
export interface ChipPropsSizeOverrides {}
export interface ChipPropsVariantOverrides {}

interface ComponentsProps {
  root?: SlotComponentProps<'div', { sx?: SxProps }, ChipOwnerState>;
  label?: SlotComponentProps<'span', { sx?: SxProps }, ChipOwnerState>;
  action?: SlotComponentProps<
    'button',
    { sx?: SxProps; component?: React.ElementType; href?: string; to?: string },
    ChipOwnerState
  >;
  startDecorator?: SlotComponentProps<'span', { sx?: SxProps }, ChipOwnerState>;
  endDecorator?: SlotComponentProps<'span', { sx?: SxProps }, ChipOwnerState>;
}

export interface ChipTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * The props used for each slot inside the component.
     * @default {}
     */
    componentsProps?: ComponentsProps;
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
     * Element action click handler.
     */
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
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

export interface ChipOwnerState extends ChipProps {
  /**
   * If `true`, the chip is clickable.
   */
  clickable: boolean;
  /**
   * If `true`, the action slot's focus is visible.
   */
  focusVisible?: boolean;
}
