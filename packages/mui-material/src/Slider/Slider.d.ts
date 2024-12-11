import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableStringUnion } from '@mui/types';
import { Mark } from './useSlider.types';
import { SlotComponentProps } from '../utils/types';
import { Theme } from '../styles';
import { OverrideProps, OverridableComponent } from '../OverridableComponent';
import SliderValueLabelComponent from './SliderValueLabel';
import { SliderClasses } from './sliderClasses';

export interface SliderPropsColorOverrides {}

export interface SliderPropsSizeOverrides {}

export interface SliderComponentsPropsOverrides {}

export interface SliderOwnerState extends SliderProps {
  dragging: boolean;
  marked: boolean;
  focusedThumbIndex: number;
}

export interface SliderOwnProps {
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
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color?: OverridableStringUnion<
    'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning',
    SliderPropsColorOverrides
  >;
  /**
   * The components used for each slot inside.
   *
   * @deprecated use the `slots` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   *
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
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @deprecated use the `slotProps` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   *
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
      typeof SliderValueLabelComponent,
      SliderComponentsPropsOverrides,
      SliderOwnerState
    >;
    input?: SlotComponentProps<'input', SliderComponentsPropsOverrides, SliderOwnerState>;
  };
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<SliderClasses>;
  /**
   * @ignore
   */
  className?: string;
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
   * @param {any} x
   * @returns {any}
   * @default function Identity(x) {
   *   return x;
   * }
   */
  scale?: (value: number) => number;
  /**
   * The granularity with which the slider can step through values when using Page Up/Page Down or Shift + Arrow Up/Arrow Down.
   * @default 10
   */
  shiftStep?: number;
  /**
   * The size of the slider.
   * @default 'medium'
   */
  size?: OverridableStringUnion<'small' | 'medium', SliderPropsSizeOverrides>;
  /**
   * The props used for each slot inside the Slider.
   * @default {}
   */
  slotProps?: {
    root?: SlotComponentProps<'span', SliderComponentsPropsOverrides, SliderOwnerState>;
    track?: SlotComponentProps<'span', SliderComponentsPropsOverrides, SliderOwnerState>;
    rail?: SlotComponentProps<'span', SliderComponentsPropsOverrides, SliderOwnerState>;
    thumb?: SlotComponentProps<'span', SliderComponentsPropsOverrides, SliderOwnerState>;
    mark?: SlotComponentProps<'span', SliderComponentsPropsOverrides, SliderOwnerState>;
    markLabel?: SlotComponentProps<'span', SliderComponentsPropsOverrides, SliderOwnerState>;
    valueLabel?: SlotComponentProps<
      typeof SliderValueLabelComponent,
      SliderComponentsPropsOverrides,
      SliderOwnerState
    >;
    input?: SlotComponentProps<'input', SliderComponentsPropsOverrides, SliderOwnerState>;
  };
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
   * The granularity with which the slider can step through values. (A "discrete" slider.)
   * The `min` prop serves as the origin for the valid values.
   * We recommend (max - min) to be evenly divisible by the step.
   *
   * When step is `null`, the thumb can only be slid onto marks provided with the `marks` prop.
   * @default 1
   */
  step?: number | null;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
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
   * @param {any} x
   * @returns {any}
   * @default function Identity(x) {
   *   return x;
   * }
   */
  valueLabelFormat?: string | ((value: number, index: number) => React.ReactNode);
}

export interface SliderTypeMap<
  RootComponent extends React.ElementType = 'span',
  AdditionalProps = {},
> {
  props: AdditionalProps & SliderOwnProps;
  defaultComponent: RootComponent;
}

export interface SliderValueLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactElement<unknown>;
  index: number;
  open: boolean;
  value: React.ReactNode;
}

type SliderRootProps = NonNullable<SliderTypeMap['props']['componentsProps']>['root'];
type SliderMarkProps = NonNullable<SliderTypeMap['props']['componentsProps']>['mark'];
type SliderMarkLabelProps = NonNullable<SliderTypeMap['props']['componentsProps']>['markLabel'];
type SliderRailProps = NonNullable<SliderTypeMap['props']['componentsProps']>['rail'];
type SliderTrackProps = NonNullable<SliderTypeMap['props']['componentsProps']>['track'];
type SliderThumbProps = NonNullable<SliderTypeMap['props']['componentsProps']>['thumb'];

export declare const SliderRoot: React.FC<SliderRootProps>;
export declare const SliderMark: React.FC<SliderMarkProps>;
export declare const SliderMarkLabel: React.FC<SliderMarkLabelProps>;
export declare const SliderRail: React.FC<SliderRailProps>;
export declare const SliderTrack: React.FC<SliderTrackProps>;
export declare const SliderThumb: React.FC<SliderThumbProps>;
export declare const SliderValueLabel: React.FC<SliderValueLabelProps>;

/**
 *
 * Demos:
 *
 * - [Slider](https://mui.com/material-ui/react-slider/)
 *
 * API:
 *
 * - [Slider API](https://mui.com/material-ui/api/slider/)
 */
declare const Slider: OverridableComponent<SliderTypeMap>;

export type SliderProps<
  RootComponent extends React.ElementType = SliderTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<SliderTypeMap<RootComponent, AdditionalProps>, RootComponent> & {
  component?: React.ElementType;
};

export default Slider;
