import * as React from 'react';
import { StandardProps } from '@material-ui/core';

export interface Mark {
  value: number;
  label?: React.ReactNode;
}

export interface ThumbLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: number;
  open: boolean;
  children: React.ReactElement;
}

export interface SliderProps
  extends StandardProps<
    React.HTMLAttributes<HTMLSpanElement>,
    SliderClassKey,
    'defaultValue' | 'onChange'
  > {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-valuetext'?: string;
  defaultValue?: number | number[];
  disabled?: boolean;
  getAriaValueText?: (value: number, index: number) => string;
  marks?: boolean | Mark[];
  max?: number;
  min?: number;
  name?: string;
  onChange?: (event: React.ChangeEvent<{}>, value: number | number[]) => void;
  onChangeCommitted?: (event: React.ChangeEvent<{}>, value: number | number[]) => void;
  orientation?: 'horizontal' | 'vertical';
  step?: number | null;
  ThumbLabelComponent?: React.ElementType<ThumbLabelProps>;
  thumbLabelDisplay?: 'on' | 'active' | 'off';
  thumbLabelFormat?: string | ((value: number, index: number) => React.ReactNode);
  value?: number | number[];
}

export type SliderClassKey =
  | 'root'
  | 'marked'
  | 'vertical'
  | 'rtl'
  | 'disabled'
  | 'rail'
  | 'track'
  | 'thumb'
  | 'thumbLabel'
  | 'mark'
  | 'markActive'
  | 'markLabel'
  | 'markLabelActive';

declare const Slider: React.ComponentType<SliderProps>;

export default Slider;
