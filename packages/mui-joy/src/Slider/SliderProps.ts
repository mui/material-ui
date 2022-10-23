import * as React from 'react';
import { SlotComponentProps } from '@mui/base';
import { ExtendSliderUnstyledTypeMap } from '@mui/base/SliderUnstyled';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { ColorPaletteProp, VariantProp, SxProps, ApplyColorInversion } from '../styles/types';

export type SliderSlot =
  | 'root'
  | 'mark'
  | 'markLabel'
  | 'rail'
  | 'track'
  | 'thumb'
  | 'valueLabel'
  | 'input';

export interface SliderPropsVariantOverrides {}

export interface SliderPropsColorOverrides {}

export interface SliderPropsSizeOverrides {}

export interface SliderOwnProps {
  /**
   * The props used for each slot inside the Slider.
   * @default {}
   */
  componentsProps?: {
    root?: SlotComponentProps<'span', { sx?: SxProps }, SliderOwnerState>;
    track?: SlotComponentProps<'span', { sx?: SxProps }, SliderOwnerState>;
    rail?: SlotComponentProps<'span', { sx?: SxProps }, SliderOwnerState>;
    thumb?: SlotComponentProps<'span', { sx?: SxProps }, SliderOwnerState>;
    mark?: SlotComponentProps<'span', { sx?: SxProps }, SliderOwnerState>;
    markLabel?: SlotComponentProps<'span', { sx?: SxProps }, SliderOwnerState>;
    valueLabel?: SlotComponentProps<'span', { sx?: SxProps }, SliderOwnerState>;
    input?: SlotComponentProps<'input', { sx?: SxProps }, SliderOwnerState>;
  };
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'primary'
   */
  color?: OverridableStringUnion<ColorPaletteProp, SliderPropsColorOverrides>;
  /**
   * The size of the component.
   * It accepts theme values between 'sm' and 'lg'.
   * @default 'md'
   */
  size?: OverridableStringUnion<'sm' | 'md' | 'lg', SliderPropsSizeOverrides>;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps;
  /**
   * The variant to use.
   * @default 'solid'
   */
  variant?: OverridableStringUnion<VariantProp, SliderPropsVariantOverrides>;
}

export type SliderTypeMap<
  D extends React.ElementType = 'span',
  P = {},
> = ExtendSliderUnstyledTypeMap<{
  props: P & SliderOwnProps;
  defaultComponent: D;
}>;

export type SliderProps<
  D extends React.ElementType = SliderTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<SliderTypeMap<D, P>, D>;

export interface SliderOwnerState extends ApplyColorInversion<SliderProps> {
  /**
   * If `true`, the thumb is in dragging state.
   */
  dragging: boolean;
  /**
   * If `true`, some of the marks has `label` property.
   */
  marked: boolean;
}
