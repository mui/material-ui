import * as React from 'react';
import { EventHandlers } from '../utils';

export interface UseSliderParameters {
  'aria-labelledby'?: string;
  defaultValue?: number | number[];
  disabled?: boolean;
  disableSwap?: boolean;
  isRtl?: boolean;
  marks?: boolean | Mark[];
  max?: number;
  min?: number;
  name?: string;
  onChange?: (event: Event, value: number | number[], activeThumb: number) => void;
  onChangeCommitted?: (event: React.SyntheticEvent | Event, value: number | number[]) => void;
  orientation?: 'horizontal' | 'vertical';
  ref: React.Ref<any>;
  scale?: (value: number) => number;
  step?: number | null;
  tabIndex?: number;
  value?: number | number[];
}

export interface Mark {
  value: number;
  label?: React.ReactNode;
}

export type UseSliderRootSlotOwnProps = {
  onMouseDown: React.MouseEventHandler;
  ref: React.Ref<any>;
};

export type UseSliderRootSlotProps<TOther = {}> = Omit<TOther, keyof UseSliderRootSlotOwnProps> &
  UseSliderRootSlotOwnProps;

export type UseSliderThumbSlotOwnProps = {
  onMouseLeave: React.MouseEventHandler;
  onMouseOver: React.MouseEventHandler;
};

export type UseSliderThumbSlotProps<TOther = {}> = Omit<TOther, keyof UseSliderThumbSlotOwnProps> &
  UseSliderThumbSlotOwnProps;

export type UseSliderHiddenInputOwnProps = {
  'aria-labelledby'?: string;
  'aria-orientation'?: React.AriaAttributes['aria-orientation'];
  'aria-valuemax'?: React.AriaAttributes['aria-valuemax'];
  'aria-valuemin'?: React.AriaAttributes['aria-valuemin'];
  disabled: boolean;
  name?: string;
  onBlur: React.FocusEventHandler;
  onChange: React.ChangeEventHandler;
  onFocus: React.FocusEventHandler;
  step?: number;
  style: React.CSSProperties;
  tabIndex?: number;
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
};

export type UseSliderHiddenInputProps<TOther = {}> = Omit<
  TOther,
  keyof UseSliderHiddenInputOwnProps
> &
  UseSliderHiddenInputOwnProps;

export type Axis = 'horizontal' | 'vertical' | 'horizontal-reverse';

export interface AxisProps<T extends Axis> {
  offset: (
    percent: number,
  ) => T extends 'horizontal'
    ? { left: string }
    : T extends 'vertical'
    ? { bottom: string }
    : T extends 'horizontal-reverse'
    ? { right: string }
    : never;
  leap: (
    percent: number,
  ) => T extends 'horizontal' | 'horizontal-reverse'
    ? { width: string }
    : T extends 'vertical'
    ? { height: string }
    : never;
}

export interface UseSliderReturnValue {
  /**
   * The active index of the slider.
   * @default -1
   */
  active: number;
  /**
   * The orientation of the slider.
   * @default horizontal
   */
  axis: Axis;
  /**
   * Returns the `offset` and `leap` methods to calculate the positioning styles based on the slider axis.
   */
  axisProps: { [key in Axis]: AxisProps<key> };
  /**
   * If `true`, the slider is being dragged.
   * @default false
   */
  dragging: boolean;
  /**
   * The index of the thumb which is focused on the slider.
   */
  focusedThumbIndex: number;
  /**
   * Resolver for the hidden input slot's props.
   * @param otherHandlers props for the hidden input slot
   * @returns props that should be spread on the hidden input slot
   */
  getHiddenInputProps: <TOther extends EventHandlers = {}>(
    otherHandlers?: TOther,
  ) => UseSliderHiddenInputProps<TOther>;
  /**
   * Resolver for the root slot's props.
   * @param otherHandlers props for the root slot
   * @returns props that should be spread on the root slot
   */
  getRootProps: <TOther extends EventHandlers = {}>(
    otherHandlers?: TOther,
  ) => UseSliderRootSlotProps<TOther>;
  /**
   * Resolver for the thumb slot's props.
   * @param otherHandlers props for the thumb slot
   * @returns props that should be spread on the thumb slot
   */
  getThumbProps: <TOther extends EventHandlers = {}>(
    otherHandlers?: TOther,
  ) => UseSliderThumbSlotProps<TOther>;
  /**
   * The marks of the slider. Marks indicate predetermined values to which the user can move the slider.
   */
  marks: Mark[];
  /**
   * The thumb index for the current value when in hover state.
   * @default -1
   */
  open: number;
  /**
   * The range of the slider.
   */
  range: boolean;
  /**
   * If `true`, the slider is a range slider.
   */
  trackLeap: number;
  /**
   * The track offset for the current value of the slider.
   */
  trackOffset: number;
  /**
   * The possible values of the slider.
   */
  values: number[];
}
