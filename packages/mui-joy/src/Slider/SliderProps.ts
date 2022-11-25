import * as React from 'react';
import { SlotComponentProps } from '@mui/base';
import { ExtendSliderUnstyledTypeMap } from '@mui/base/SliderUnstyled';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { ColorPaletteProp, SxProps, VariantProp } from '../styles/types';

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

interface ComponentsProps {
  root?: SlotComponentProps<'span', {}, SliderOwnerState>;
  track?: SlotComponentProps<'span', {}, SliderOwnerState>;
  rail?: SlotComponentProps<'span', {}, SliderOwnerState>;
  thumb?: SlotComponentProps<'span', {}, SliderOwnerState>;
  mark?: SlotComponentProps<'span', {}, SliderOwnerState>;
  markLabel?: SlotComponentProps<'span', {}, SliderOwnerState>;
  valueLabel?: SlotComponentProps<'span', {}, SliderOwnerState>;
  input?: SlotComponentProps<'input', {}, SliderOwnerState>;
}

export interface SliderOwnProps {
  /**
   * The components used for each slot inside the Slider.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots?: {
    root?: React.ElementType;
    track?: React.ElementType;
    rail?: React.ElementType;
    thumb?: React.ElementType;
    mark?: React.ElementType;
    markLabel?: React.ElementType;
    valueLabel?: React.ElementType;
    input?: React.ElementType;
  };
  /**
   * The props used for each slot inside the component.
   * @default {}
   */
  slotProps?: ComponentsProps;
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

export interface SliderOwnerState extends SliderProps {
  /**
   * If `true`, the thumb is in dragging state.
   */
  dragging: boolean;
  /**
   * If `true`, some of the marks has `label` property.
   */
  marked: boolean;
}
