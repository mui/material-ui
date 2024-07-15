import { Simplify } from '@mui/types';
import * as React from 'react';
import { PolymorphicProps, SlotComponentProps, SlotComponentPropsWithSlotState } from '../utils';
import {
  UseSliderHiddenInputProps,
  UseSliderParameters,
  UseSliderRootSlotProps,
  UseSliderThumbSlotProps,
} from '../useSlider';

export type SliderOwnerState = Simplify<
  SliderOwnProps & {
    disabled: boolean;
    focusedThumbIndex: number;
    activeThumbIndex: number;
    isRtl: boolean;
    max: number;
    min: number;
    dragging: boolean;
    marked: boolean;
    orientation: 'horizontal' | 'vertical';
    scale: (value: number) => number;
    step: number | null;
    track: 'normal' | false | 'inverted';
    valueLabelFormat: string | ((value: number, index: number) => React.ReactNode);
  }
>;

export interface SliderRootSlotPropsOverrides {}
export interface SliderTrackSlotPropsOverrides {}
export interface SliderRailSlotPropsOverrides {}
export interface SliderThumbSlotPropsOverrides {}
export interface SliderMarkSlotPropsOverrides {}
export interface SliderMarkLabelSlotPropsOverrides {}
export interface SliderValueLabelSlotPropsOverrides {}
export interface SliderInputSlotPropsOverrides {}

export interface SliderThumbSlotState {
  focused: boolean;
  active: boolean;
  index: number;
}

export interface SliderOwnProps extends Omit<UseSliderParameters, 'ref'> {
  /**
   * The label of the slider.
   */
  'aria-label'?: string;
  /**
   * A string value that provides a user-friendly name for the current value of the slider.
   */
  'aria-valuetext'?: string;
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the thumb labels of the slider.
   * This is important for screen reader users.
   * @param {number} index The thumb label's index to format.
   * @returns {string}
   */
  getAriaLabel?: (index: number) => string;
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current value of the slider.
   * This is important for screen reader users.
   * @param {number} value The thumb label's value to format.
   * @param {number} index The thumb label's index to format.
   * @returns {string}
   */
  getAriaValueText?: (value: number, index: number) => string;
  /**
   * The props used for each slot inside the Slider.
   * @default {}
   */
  slotProps?: {
    root?: SlotComponentProps<'span', SliderRootSlotPropsOverrides, SliderOwnerState>;
    track?: SlotComponentProps<'span', SliderTrackSlotPropsOverrides, SliderOwnerState>;
    rail?: SlotComponentProps<'span', SliderRailSlotPropsOverrides, SliderOwnerState>;
    thumb?: SlotComponentPropsWithSlotState<
      'span',
      SliderThumbSlotPropsOverrides,
      SliderOwnerState,
      SliderThumbSlotState
    >;
    mark?: SlotComponentProps<'span', SliderMarkSlotPropsOverrides, SliderOwnerState>;
    markLabel?: SlotComponentProps<'span', SliderMarkLabelSlotPropsOverrides, SliderOwnerState>;
    valueLabel?: SlotComponentProps<
      React.ElementType,
      SliderValueLabelSlotPropsOverrides,
      SliderOwnerState
    >;
    input?: SlotComponentProps<'input', SliderInputSlotPropsOverrides, SliderOwnerState>;
  };
  /**
   * The components used for each slot inside the Slider.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots?: SliderSlots;
  /**
   * The track presentation:
   *
   * - `normal` the track will render a bar representing the slider value.
   * - `inverted` the track will render a bar representing the remaining slider value.
   * - `false` the track will render without a bar.
   * @default 'normal'
   */
  track?: 'normal' | false | 'inverted';
  /**
   * The format function the value label's value.
   *
   * When a function is provided, it should have the following signature:
   *
   * - {number} value The value label's value to format
   * - {number} index The value label's index to format
   * @param {any} x
   * @returns {any}
   * @default function Identity(x) {
   *   return x;
   * }
   */
  valueLabelFormat?: string | ((value: number, index: number) => React.ReactNode);
}

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
   */
  valueLabel?: React.ElementType;
  /**
   * The component that renders the input.
   * @default 'input'
   */
  input?: React.ElementType;
}

export interface SliderTypeMap<
  AdditionalProps = {},
  RootComponentType extends React.ElementType = 'span',
> {
  props: SliderOwnProps & AdditionalProps;
  defaultComponent: RootComponentType;
}

export type SliderProps<
  RootComponentType extends React.ElementType = SliderTypeMap['defaultComponent'],
> = PolymorphicProps<SliderTypeMap<{}, RootComponentType>, RootComponentType>;

export type SliderRootSlotProps = UseSliderRootSlotProps & {
  children: React.ReactNode;
  className: string;
  ownerState: SliderOwnerState;
};

export type SliderTrackSlotProps = {
  className?: string;
  ownerState: SliderOwnerState;
  style: React.CSSProperties;
};

export type SliderRailSlotProps = {
  className?: string;
  ownerState: SliderOwnerState;
};

export type SliderThumbSlotProps = UseSliderThumbSlotProps & {
  'data-index': number;
  children: React.ReactNode;
  className?: string;
  ownerState: SliderOwnerState;
  style: React.CSSProperties;
};

export type SliderMarkSlotProps = {
  'data-index': number;
  className?: string;
  markActive?: boolean;
  ownerState: SliderOwnerState;
  style: React.CSSProperties;
};

export type SliderMarkLabelSlotProps = {
  'aria-hidden': boolean;
  'data-index': number;
  className?: string;
  markLabelActive?: boolean;
  ownerState: SliderOwnerState;
  style: React.CSSProperties;
};

export type SliderValueLabelSlotProps = {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  index?: number;
  open?: boolean;
  ownerState: SliderOwnerState;
  valueLabel?: string | React.ReactNode;
  valueLabelFormat?: string | ((value: number, index: number) => React.ReactNode);
};

export type SliderInputSlotProps = UseSliderHiddenInputProps & {
  'aria-label': React.AriaAttributes['aria-label'];
  'aria-valuenow': React.AriaAttributes['aria-valuenow'];
  'aria-valuetext': React.AriaAttributes['aria-valuetext'];
  'data-index': number;
  ownerState: SliderOwnerState;
  style: React.CSSProperties;
  value: number;
};
