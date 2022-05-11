import React from 'react';
import SliderUnstyledProps from './SliderUnstyledProps';

export interface UseSliderParameters {
  'aria-labelledby'?: SliderUnstyledProps['aria-labelledby'];
  defaultValue?: SliderUnstyledProps['defaultValue'];
  disabled?: SliderUnstyledProps['disabled'];
  disableSwap?: SliderUnstyledProps['disableSwap'];
  isRtl?: SliderUnstyledProps['isRtl'];
  marks?: SliderUnstyledProps['marks'];
  max?: SliderUnstyledProps['max'];
  min?: SliderUnstyledProps['min'];
  name?: SliderUnstyledProps['name'];
  onChange?: SliderUnstyledProps['onChange'];
  onChangeCommitted?: SliderUnstyledProps['onChangeCommitted'];
  orientation?: SliderUnstyledProps['orientation'];
  ref: React.Ref<any>;
  scale?: SliderUnstyledProps['scale'];
  step?: SliderUnstyledProps['step'];
  tabIndex?: SliderUnstyledProps['tabIndex'];
  value?: SliderUnstyledProps['value'];
}

type UseSliderRootSlotOwnProps = {
  onMouseDown: React.MouseEventHandler;
  ref: React.Ref<any>;
};

export type UseSliderRootSlotProps<TOther = {}> = Omit<TOther, keyof UseSliderRootSlotOwnProps> &
  UseSliderRootSlotOwnProps;

type UseSliderThumbSlotOwnProps = {
  onMouseLeave: React.MouseEventHandler;
  onMouseOver: React.MouseEventHandler;
};

export type UseSliderThumbSlotProps<TOther = {}> = Omit<TOther, keyof UseSliderThumbSlotOwnProps> &
  UseSliderThumbSlotOwnProps;

type UseSliderHiddenInputOwnProps = {
  'aria-labelledby'?: string;
  'aria-orientation'?: React.AriaAttributes['aria-orientation'];
  'aria-valuemax'?: React.AriaAttributes['aria-valuemax'];
  'aria-valuemin'?: React.AriaAttributes['aria-valuemin'];
  disabled: boolean;
  name?: string;
  onBlur: React.FocusEventHandler;
  onChange: React.ChangeEventHandler;
  onFocus: React.FocusEventHandler;
  step?: number | null;
  style: React.CSSProperties;
  tabIndex?: number;
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
};

export type UseSliderHiddenInputProps<TOther = {}> = Omit<
  TOther,
  keyof UseSliderHiddenInputOwnProps
> &
  UseSliderHiddenInputOwnProps;
