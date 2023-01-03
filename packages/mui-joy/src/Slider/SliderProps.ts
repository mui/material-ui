import * as React from 'react';
import { SliderUnstyledOwnProps } from '@mui/base/SliderUnstyled';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { ColorPaletteProp, SxProps, VariantProp, ApplyColorInversion } from '../styles/types';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';

export type SliderSlot =
  | 'root'
  | 'mark'
  | 'markLabel'
  | 'rail'
  | 'track'
  | 'thumb'
  | 'valueLabel'
  | 'input';

export type SliderSlotsAndSlotProps = CreateSlotsAndSlotProps<
  SliderSlot,
  {
    root: SlotProps<'span', {}, SliderOwnerState>;
    track: SlotProps<'span', {}, SliderOwnerState>;
    rail: SlotProps<'span', {}, SliderOwnerState>;
    thumb: SlotProps<'span', {}, SliderOwnerState>;
    mark: SlotProps<'span', {}, SliderOwnerState & { percent?: number }>;
    markLabel: SlotProps<'span', {}, SliderOwnerState>;
    valueLabel: SlotProps<'span', {}, SliderOwnerState>;
    input: SlotProps<'input', {}, SliderOwnerState>;
  }
>;

export interface SliderPropsVariantOverrides {}
export interface SliderPropsColorOverrides {}
export interface SliderPropsSizeOverrides {}

export type SliderTypeMap<D extends React.ElementType = 'span', P = {}> = {
  props: P &
    Omit<SliderUnstyledOwnProps, 'slots' | 'slotProps'> &
    SliderSlotsAndSlotProps & {
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
    };
  defaultComponent: D;
};

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
