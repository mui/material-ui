import { SlotComponentProps } from '@mui/base';
import { ExtendSliderUnstyledTypeMap, SliderValueLabelUnstyled } from '@mui/base/SliderUnstyled';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import * as React from 'react';
import { ColorPaletteProp, SxProps } from '../styles/types';

export type SliderSlot =
  | 'root'
  | 'mark'
  | 'markLabel'
  | 'rail'
  | 'track'
  | 'thumb'
  | 'valueLabel'
  | 'input';

export interface SliderPropsColorOverrides {}

export interface SliderPropsSizeOverrides {}

export interface SliderComponentsPropsOverrides {}

interface SliderOwnProps {
  /**
   * The props used for each slot inside the Slider.
   * @default {}
   */
  componentsProps?: {
    root?: SlotComponentProps<'span', SliderComponentsPropsOverrides, SliderOwnerState>;
    track?: SlotComponentProps<'span', SliderComponentsPropsOverrides, SliderOwnerState>;
    rail?: SlotComponentProps<'span', SliderComponentsPropsOverrides, SliderOwnerState>;
    thumb?: SlotComponentProps<'span', SliderComponentsPropsOverrides, SliderOwnerState>;
    mark?: SlotComponentProps<'span', SliderComponentsPropsOverrides, SliderOwnerState>;
    markLabel?: SlotComponentProps<'span', SliderComponentsPropsOverrides, SliderOwnerState>;
    valueLabel?: SlotComponentProps<
      typeof SliderValueLabelUnstyled,
      SliderComponentsPropsOverrides,
      SliderOwnerState
    >;

    input?: SlotComponentProps<'input', SliderComponentsPropsOverrides, SliderOwnerState>;
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

export type SliderOwnerState = SliderProps & {
  dragging: boolean;
  marked: boolean;
};
