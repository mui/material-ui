import { OverridableComponent } from '@material-ui/core/OverridableComponent';

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
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'primary'
     */
    color?: 'primary' | 'secondary';
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
    };
    /**
     * The props used for each slot inside the Slider.
     * @default {}
     */
    componentsProps?: {
      root?: {
        styleProps?: Omit<SliderTypeMap<P, D>['props'], 'components' | 'componentsProps'>;
        as: React.ElementType;
      };
      track?: {
        as?: React.ElementType;
      };
      rail?: {
        as?: React.ElementType;
      };
      thumb?: {
        as?: React.ElementType;
      };
      mark?: {
        as?: React.ElementType;
      };
      markLabel?: {
        as?: React.ElementType;
      };
      valueLabel?: {
        as?: React.ElementType;
      };
    };
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
     * Indicates whether the theme context has rtl direction. It is set automatically.
     * @default false
     */
    isRtl?: boolean;
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
 *
 * API:
 *
 * - [SliderUnstyled API](https://material-ui.com/api/slider-unstyled/)
 */
declare const SliderUnstyled: OverridableComponent<SliderTypeMap>;

export default SliderUnstyled;
