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

export interface UseSliderRootSlotOwnProps {
  onMouseDown: React.MouseEventHandler;
  ref: React.Ref<any>;
}

export type UseSliderRootSlotProps<TOther = {}> = Omit<TOther, keyof UseSliderRootSlotOwnProps> &
  UseSliderRootSlotOwnProps;

export interface UseSliderThumbSlotOwnProps {
  onMouseLeave: React.MouseEventHandler;
  onMouseOver: React.MouseEventHandler;
}

export type UseSliderThumbSlotProps<TOther = {}> = Omit<TOther, keyof UseSliderThumbSlotOwnProps> &
  UseSliderThumbSlotOwnProps;

export interface UseSliderHiddenInputOwnProps {
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
}

export type UseSliderHiddenInputProps<TOther = {}> = Omit<
  TOther,
  keyof UseSliderHiddenInputOwnProps
> &
  UseSliderHiddenInputOwnProps;

export type Axes = 'horizontal' | 'vertical' | 'horizontal-reverse';

export interface AxisProps<T extends Axes> {
  offset: (percent: number) =>
    T extends 'horizontal' ? ({ left: string }) :
      T extends 'vertical' ? ({ bottom: string }) :
        T extends 'horizontal-reverse' ? ({ right: string }) :
          never;
  leap: (percent: number) =>
    T extends 'horizontal' | 'horizontal-reverse' ? ({ width: string }) :
      T extends 'vertical' ? ({ height: string }) :
        never;
}

export interface UseSliderReturnValue {
  active: number;
  axis: Axes;
  axisProps: { [key in Axes]: AxisProps<key> };
  dragging: boolean;
  focusedThumbIndex: number;
  getHiddenInputProps: <TOther extends EventHandlers = {}>(otherHandlers: TOther) => UseSliderHiddenInputProps<TOther>;
  getRootProps: <TOther extends EventHandlers = {}>(otherHandlers: TOther) => UseSliderRootSlotProps<TOther>;
  getThumbProps: <TOther extends EventHandlers = {}>(otherHandlers: TOther) => UseSliderThumbSlotProps<TOther>;
  marks: Mark[];
  open: number;
  range: boolean;
  trackLeap: number;
  trackOffset: number;
  values: number[];
}
