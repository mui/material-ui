import { OverridableComponent, OverridableTypeMap, OverrideProps } from '@mui/types';
import React from 'react';
import { SliderUnstyledClasses } from './sliderUnstyledClasses';
import SliderValueLabelUnstyled from './SliderValueLabelUnstyled';
import {
  UseSliderHiddenInputProps,
  UseSliderRootSlotProps,
  UseSliderThumbSlotProps,
  Mark,
} from './useSlider.types';

export type SliderUnstyledOwnerState = SliderUnstyledProps & {
  disabled: boolean;
  isRtl: boolean;
  mark: boolean | Mark[];
  max: number;
  min: number;
  orientation: 'horizontal' | 'vertical';
  scale: (value: number) => number;
  step: number | null;
  track: 'normal' | false | 'inverted';
  valueLabelDisplay: 'on' | 'auto' | 'off';
  valueLabelFormat: string | ((value: number, index: number) => React.ReactNode);
};

export interface SliderValueLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactElement;
  index: number;
  open: boolean;
  value: number;
}

export interface SliderUnstyledComponentsPropsOverrides {}

export interface SliderUnstyledTypeMap<P = {}, D extends React.ElementType = 'span'> {
  props: P & {
    /**
     * The label of the slider.
     */
    'aria-label'?: string;
    /**
     * The id of the element containing a label for the slider.
     */
    'aria-labelledby'?: string;
    /**
     * A string value that provides a user-friendly name for the current value of the slider.
     */
    'aria-valuetext'?: string;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<SliderUnstyledClasses>;
    /**
     * The components used for each slot inside the Slider.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    components?: {
      Root?: React.ElementType;
      Track?: React.ElementType;
      Rail?: React.ElementType;
      Thumb?: React.ElementType;
      Mark?: React.ElementType;
      MarkLabel?: React.ElementType;
      ValueLabel?: React.ElementType;
      Input?: React.ElementType;
    };
    /**
     * The props used for each slot inside the Slider.
     * @default {}
     */
    componentsProps?: {
      root?: React.ComponentPropsWithRef<'span'> & SliderUnstyledComponentsPropsOverrides;
      track?: React.ComponentPropsWithRef<'span'> & SliderUnstyledComponentsPropsOverrides;
      rail?: React.ComponentPropsWithRef<'span'> & SliderUnstyledComponentsPropsOverrides;
      thumb?: React.ComponentPropsWithRef<'span'> & SliderUnstyledComponentsPropsOverrides;
      mark?: React.ComponentPropsWithRef<'span'> & SliderUnstyledComponentsPropsOverrides;
      markLabel?: React.ComponentPropsWithRef<'span'> & SliderUnstyledComponentsPropsOverrides;
      valueLabel?: Partial<React.ComponentPropsWithRef<typeof SliderValueLabelUnstyled>> &
        SliderUnstyledComponentsPropsOverrides;
      input?: React.ComponentPropsWithRef<'input'> & SliderUnstyledComponentsPropsOverrides;
    };
    /**
     * The default value. Use when the component is not controlled.
     */
    defaultValue?: number | number[];
    /**
     * If `true`, the component is disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * If `true`, the active thumb doesn't swap when moving pointer over a thumb while dragging another thumb.
     * @default false
     */
    disableSwap?: boolean;
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
     * Indicates whether the theme context has rtl direction. It is set automatically.
     * @default false
     */
    isRtl?: boolean;
    /**
     * Marks indicate predetermined values to which the user can move the slider.
     * If `true` the marks are spaced according the value of the `step` prop.
     * If an array, it should contain objects with `value` and an optional `label` keys.
     * @default false
     */
    marks?: boolean | Mark[];
    /**
     * The maximum allowed value of the slider.
     * Should not be equal to min.
     * @default 100
     */
    max?: number;
    /**
     * The minimum allowed value of the slider.
     * Should not be equal to max.
     * @default 0
     */
    min?: number;
    /**
     * Name attribute of the hidden `input` element.
     */
    name?: string;
    /**
     * Callback function that is fired when the slider's value changed.
     *
     * @param {Event} event The event source of the callback.
     * You can pull out the new value by accessing `event.target.value` (any).
     * **Warning**: This is a generic event not a change event.
     * @param {number | number[]} value The new value.
     * @param {number} activeThumb Index of the currently moved thumb.
     */
    onChange?: (event: Event, value: number | number[], activeThumb: number) => void;
    /**
     * Callback function that is fired when the `mouseup` is triggered.
     *
     * @param {React.SyntheticEvent | Event} event The event source of the callback. **Warning**: This is a generic event not a change event.
     * @param {number | number[]} value The new value.
     */
    onChangeCommitted?: (event: React.SyntheticEvent | Event, value: number | number[]) => void;
    /**
     * The component orientation.
     * @default 'horizontal'
     */
    orientation?: 'horizontal' | 'vertical';
    /**
     * A transformation function, to change the scale of the slider.
     * @default (x) => x
     */
    scale?: (value: number) => number;
    /**
     * The granularity with which the slider can step through values. (A "discrete" slider.)
     * The `min` prop serves as the origin for the valid values.
     * We recommend (max - min) to be evenly divisible by the step.
     *
     * When step is `null`, the thumb can only be slid onto marks provided with the `marks` prop.
     * @default 1
     */
    step?: number | null;
    /**
     * Tab index attribute of the hidden `input` element.
     */
    tabIndex?: number;
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
     * The value of the slider.
     * For ranged sliders, provide an array with two values.
     */
    value?: number | number[];
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
     * The format function the value label's value.
     *
     * When a function is provided, it should have the following signature:
     *
     * - {number} value The value label's value to format
     * - {number} index The value label's index to format
     * @default (x) => x
     */
    valueLabelFormat?: string | ((value: number, index: number) => React.ReactNode);
  };
  defaultComponent: D;
}

/**
 * Utility to create component types that inherit props from SliderUnstyled.
 */
export interface ExtendSliderUnstyledTypeMap<M extends OverridableTypeMap> {
  props: M['props'] & SliderUnstyledTypeMap['props'];
  defaultComponent: M['defaultComponent'];
}

export type ExtendSliderUnstyled<M extends OverridableTypeMap> = OverridableComponent<
  ExtendSliderUnstyledTypeMap<M>
>;

export type SliderUnstyledProps<
  D extends React.ElementType = SliderUnstyledTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<SliderUnstyledTypeMap<P, D>, D>;

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
  valueLabelDisplay?: 'on' | 'auto' | 'off';
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
