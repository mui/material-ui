import { OverridableComponent, OverridableTypeMap, OverrideProps } from '@mui/types';
import * as React from 'react';
import { SlotComponentProps } from '../utils';
import {
  UseSliderHiddenInputProps,
  UseSliderParameters,
  UseSliderRootSlotProps,
  UseSliderThumbSlotProps,
} from '../useSlider';

export interface SliderUnstyledOwnerState extends SliderUnstyledOwnProps {
  disabled: boolean;
  focusedThumbIndex: number;
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

export interface SliderUnstyledRootSlotPropsOverrides {}
export interface SliderUnstyledTrackSlotPropsOverrides {}
export interface SliderUnstyledRailSlotPropsOverrides {}
export interface SliderUnstyledThumbSlotPropsOverrides {}
export interface SliderUnstyledMarkSlotPropsOverrides {}
export interface SliderUnstyledMarkLabelSlotPropsOverrides {}
export interface SliderUnstyledValueLabelSlotPropsOverrides {}
export interface SliderUnstyledInputSlotPropsOverrides {}

export interface SliderUnstyledOwnProps extends Omit<UseSliderParameters, 'ref'> {
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
    root?: SlotComponentProps<
      'span',
      SliderUnstyledRootSlotPropsOverrides,
      SliderUnstyledOwnerState
    >;
    track?: SlotComponentProps<
      'span',
      SliderUnstyledTrackSlotPropsOverrides,
      SliderUnstyledOwnerState
    >;
    rail?: SlotComponentProps<
      'span',
      SliderUnstyledRailSlotPropsOverrides,
      SliderUnstyledOwnerState
    >;
    thumb?: SlotComponentProps<
      'span',
      SliderUnstyledThumbSlotPropsOverrides,
      SliderUnstyledOwnerState
    >;
    mark?: SlotComponentProps<
      'span',
      SliderUnstyledMarkSlotPropsOverrides,
      SliderUnstyledOwnerState
    >;
    markLabel?: SlotComponentProps<
      'span',
      SliderUnstyledMarkLabelSlotPropsOverrides,
      SliderUnstyledOwnerState
    >;
    valueLabel?: SlotComponentProps<
      React.ElementType,
      SliderUnstyledValueLabelSlotPropsOverrides,
      SliderUnstyledOwnerState
    >;
    input?: SlotComponentProps<
      'input',
      SliderUnstyledInputSlotPropsOverrides,
      SliderUnstyledOwnerState
    >;
  };
  /**
   * The components used for each slot inside the Slider.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots?: SliderUnstyledSlots;
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

export interface SliderUnstyledSlots {
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

export interface SliderUnstyledTypeMap<P = {}, D extends React.ElementType = 'span'> {
  props: P & SliderUnstyledOwnProps;
  defaultComponent: D;
}

/**
 * Utility to create component types that inherit props from SliderUnstyled.
 */
export interface ExtendSliderUnstyledTypeMap<M extends OverridableTypeMap> {
  props: M['props'] & Omit<SliderUnstyledTypeMap['props'], 'isRtl'>;
  defaultComponent: M['defaultComponent'];
}

export type ExtendSliderUnstyled<M extends OverridableTypeMap> = OverridableComponent<
  ExtendSliderUnstyledTypeMap<M>
>;

export type SliderUnstyledProps<
  D extends React.ElementType = SliderUnstyledTypeMap['defaultComponent'],
> = OverrideProps<SliderUnstyledTypeMap<{}, D>, D> & {
  component?: D;
};

export type SliderUnstyledRootSlotProps = UseSliderRootSlotProps & {
  children: React.ReactNode;
  className: string;
  ownerState: SliderUnstyledOwnerState;
};

export type SliderUnstyledTrackSlotProps = {
  className?: string;
  ownerState: SliderUnstyledOwnerState;
  style: React.CSSProperties;
};

export type SliderUnstyledRailSlotProps = {
  className?: string;
  ownerState: SliderUnstyledOwnerState;
};

export type SliderUnstyledThumbSlotProps = UseSliderThumbSlotProps & {
  'data-index': number;
  children: React.ReactNode;
  className?: string;
  ownerState: SliderUnstyledOwnerState;
  style: React.CSSProperties;
};

export type SliderUnstyledMarkSlotProps = {
  'data-index': number;
  className?: string;
  markActive?: boolean;
  ownerState: SliderUnstyledOwnerState;
  style: React.CSSProperties;
};

export type SliderUnstyledMarkLabelSlotProps = {
  'aria-hidden': boolean;
  'data-index': number;
  className?: string;
  markLabelActive?: boolean;
  ownerState: SliderUnstyledOwnerState;
  style: React.CSSProperties;
};

export type SliderUnstyledValueLabelSlotProps = {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  index?: number;
  open?: boolean;
  ownerState: SliderUnstyledOwnerState;
  valueLabel?: string | React.ReactNode;
  valueLabelFormat?: string | ((value: number, index: number) => React.ReactNode);
};

export type SliderUnstyledInputSlotProps = UseSliderHiddenInputProps & {
  'aria-label': React.AriaAttributes['aria-label'];
  'aria-valuenow': React.AriaAttributes['aria-valuenow'];
  'aria-valuetext': React.AriaAttributes['aria-valuetext'];
  'data-index': number;
  ownerState: SliderUnstyledOwnerState;
  style: React.CSSProperties;
  value: number;
};
