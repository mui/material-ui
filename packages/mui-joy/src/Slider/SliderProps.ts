import * as React from 'react';
import { SliderClasses, SliderOwnProps } from '@mui/base/Slider';
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

export interface SliderSlots {
  /**
   * The component that renders the root.
   * @default 'span'
   */
  root?: React.ElementType;
  /**
   * The component that renders the track.
   * @default 'span'
   */
  track?: React.ElementType;
  /**
   * The component that renders the rail.
   * @default 'span'
   */
  rail?: React.ElementType;
  /**
   * The component that renders the thumb.
   * @default 'span'
   */
  thumb?: React.ElementType;
  /**
   * The component that renders the mark.
   * @default 'span'
   */
  mark?: React.ElementType;
  /**
   * The component that renders the mark label.
   * @default 'span'
   */
  markLabel?: React.ElementType;
  /**
   * The component that renders the value label.
   * @default 'span'
   */
  valueLabel?: React.ElementType;
  /**
   * The component that renders the input.
   * @default 'input'
   */
  input?: React.ElementType;
}

export type SliderSlotsAndSlotProps = CreateSlotsAndSlotProps<
  SliderSlots,
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
    Omit<SliderOwnProps, 'slots' | 'slotProps'> & {
      /**
       * Override or extend the styles applied to the component.
       */
      classes?: Partial<SliderClasses>;
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
       * Controls when the value label is displayed:
       *
       * - `auto` the value label will display when the thumb is hovered or focused.
       * - `on` will display persistently.
       * - `off` will never display.
       * @default 'off'
       */
      valueLabelDisplay?: 'on' | 'auto' | 'off';
      /**
       * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
       * @default 'solid'
       */
      variant?: OverridableStringUnion<VariantProp, SliderPropsVariantOverrides>;
    } & SliderSlotsAndSlotProps;
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
