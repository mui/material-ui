import * as React from 'react';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface Mark {
  value: number;
  label?: React.ReactNode;
}

export interface ValueLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: number;
  open: boolean;
  children: React.ReactElement;
}

export interface SliderTypeMap<P = {}, D extends React.ElementType = 'span'> {
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
     * The color of the component. It supports those theme colors that make sense for this component.
     */
    color?: 'primary' | 'secondary';
    /**
     * The default element value. Use when the component is not controlled.
     */
    defaultValue?: number | number[];
    /**
     * If `true`, the slider will be disabled.
     */
    disabled?: boolean;
    /**
     * Accepts a function which returns a string value that provides a user-friendly name for the thumb labels of the slider.
     *
     * @param {number} index The thumb label's index to format.
     * @returns {string}
     */
    getAriaLabel?: (index: number) => string;
    /**
     * Accepts a function which returns a string value that provides a user-friendly name for the current value of the slider.
     *
     * @param {number} value The thumb label's value to format.
     * @param {number} index The thumb label's index to format.
     * @returns {string}
     */
    getAriaValueText?: (value: number, index: number) => string;
    /**
     * Marks indicate predetermined values to which the user can move the slider.
     * If `true` the marks will be spaced according the value of the `step` prop.
     * If an array, it should contain objects with `value` and an optional `label` keys.
     */
    marks?: boolean | Mark[];
    /**
     * The maximum allowed value of the slider.
     * Should not be equal to min.
     */
    max?: number;
    /**
     * The minimum allowed value of the slider.
     * Should not be equal to max.
     */
    min?: number;
    /**
     * Name attribute of the hidden `input` element.
     */
    name?: string;
    /**
     * Callback function that is fired when the slider's value changed.
     *
     * @param {object} event The event source of the callback. **Warning**: This is a generic event not a change event.
     * @param {number | number[]} value The new value.
     */
    onChange?: (event: React.SyntheticEvent, value: number | number[]) => void;
    /**
     * Callback function that is fired when the `mouseup` is triggered.
     *
     * @param {object} event The event source of the callback. **Warning**: This is a generic event not a change event.
     * @param {number | number[]} value The new value.
     */
    onChangeCommitted?: (event: React.SyntheticEvent, value: number | number[]) => void;
    /**
     * The slider orientation.
     */
    orientation?: 'horizontal' | 'vertical';
    /**
     * A transformation function, to change the scale of the slider.
     */
    scale?: (value: number) => number;
    /**
     * The granularity with which the slider can step through values. (A "discrete" slider.)
     * The `min` prop serves as the origin for the valid values.
     * We recommend (max - min) to be evenly divisible by the step.
     *
     * When step is `null`, the thumb can only be slid onto marks provided with the `marks` prop.
     */
    step?: number | null;
    /**
     * The component used to display the value label.
     */
    ThumbComponent?: React.ElementType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * The track presentation:
     *
     * - `normal` the track will render a bar representing the slider value.
     * - `inverted` the track will render a bar representing the remaining slider value.
     * - `false` the track will render without a bar.
     */
    track?: 'normal' | false | 'inverted';
    /**
     * The value of the slider.
     * For ranged sliders, provide an array with two values.
     */
    value?: number | number[];
    /**
     * The value label component.
     */
    ValueLabelComponent?: React.ElementType<ValueLabelProps>;
    /**
     * Controls when the value label is displayed:
     *
     * - `auto` the value label will display when the thumb is hovered or focused.
     * - `on` will display persistently.
     * - `off` will never display.
     */
    valueLabelDisplay?: 'on' | 'auto' | 'off';
    /**
     * The format function the value label's value.
     *
     * When a function is provided, it should have the following signature:
     *
     * - {number} value The value label's value to format
     * - {number} index The value label's index to format
     */
    valueLabelFormat?: string | ((value: number, index: number) => React.ReactNode);
  };
  defaultComponent: D;
  classKey: SliderClassKey;
}
/**
 *
 * Demos:
 *
 * - [Slider](https://material-ui.com/components/slider/)
 *
 * API:
 *
 * - [Slider API](https://material-ui.com/api/slider/)
 */
declare const Slider: OverridableComponent<SliderTypeMap>;

export type SliderClassKey =
  | 'root'
  | 'colorPrimary'
  | 'colorSecondary'
  | 'marked'
  | 'vertical'
  | 'disabled'
  | 'rail'
  | 'track'
  | 'trackFalse'
  | 'trackInverted'
  | 'thumb'
  | 'thumbColorPrimary'
  | 'thumbColorSecondary'
  | 'active'
  | 'focusVisible'
  | 'valueLabel'
  | 'mark'
  | 'markActive'
  | 'markLabel'
  | 'markLabelActive';

export type SliderProps<
  D extends React.ElementType = SliderTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<SliderTypeMap<P, D>, D>;

export default Slider;
