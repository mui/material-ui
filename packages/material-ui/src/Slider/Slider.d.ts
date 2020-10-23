import * as React from 'react';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface Mark {
  value: number;
  label?: React.ReactNode;
}

export interface ValueLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactElement;
  index: number;
  open: boolean;
  value: number;
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
     * Override or extend the styles applied to the component.
     */
    classes?: {
      /** Styles applied to the root element. */
      root?: string;
      /** Styles applied to the root element if `color="primary"`. */
      colorPrimary?: string;
      /** Styles applied to the root element if `color="secondary"`. */
      colorSecondary?: string;
      /** Styles applied to the root element if `marks` is provided with at least one label. */
      marked?: string;
      /** Pseudo-class applied to the root element if `orientation="vertical"`. */
      vertical?: string;
      /** Pseudo-class applied to the root and thumb element if `disabled={true}`. */
      disabled?: string;
      /** Styles applied to the rail element. */
      rail?: string;
      /** Styles applied to the track element. */
      track?: string;
      /** Styles applied to the track element if `track={false}`. */
      trackFalse?: string;
      /** Styles applied to the track element if `track="inverted"`. */
      trackInverted?: string;
      /** Styles applied to the thumb element. */
      thumb?: string;
      /** Styles applied to the thumb element if `color="primary"`. */
      thumbColorPrimary?: string;
      /** Styles applied to the thumb element if `color="secondary"`. */
      thumbColorSecondary?: string;
      /** Pseudo-class applied to the thumb element if it's active. */
      active?: string;
      /** Pseudo-class applied to the thumb element if keyboard focused. */
      focusVisible?: string;
      /** Styles applied to the thumb label element. */
      valueLabel?: string;
      /** Styles applied to the mark element. */
      mark?: string;
      /** Styles applied to the mark element if active (depending on the value). */
      markActive?: string;
      /** Styles applied to the mark label element. */
      markLabel?: string;
      /** Styles applied to the mark label element if active (depending on the value). */
      markLabelActive?: string;
    };
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'primary'
     */
    color?: 'primary' | 'secondary';
    /**
     * The default element value. Use when the component is not controlled.
     */
    defaultValue?: number | number[];
    /**
     * If `true`, the slider will be disabled.
     * @default false
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
     * The component used to display the value label.
     * @default 'span'
     */
    ThumbComponent?: React.ElementType<React.HTMLAttributes<HTMLSpanElement>>;
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
     * The value label component.
     * @default ValueLabel
     */
    ValueLabelComponent?: React.ElementType<ValueLabelProps>;
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

export type SliderClassKey = keyof NonNullable<SliderTypeMap['props']['classes']>;

export type SliderProps<
  D extends React.ElementType = SliderTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<SliderTypeMap<P, D>, D>;

export default Slider;
