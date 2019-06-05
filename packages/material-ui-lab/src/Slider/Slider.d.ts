import * as React from 'react';
import { StandardProps } from '@material-ui/core';

/**
 * @param rawValue - the value inferred from the event in [min, max]
 */
export type ValueReducer = (
  rawValue: number,
  props: SliderProps,
  event: React.SyntheticEvent,
) => number;

export const defaultValueReducer: ValueReducer;

export interface SliderProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, SliderClassKey, 'onChange', false> {
  disabled?: boolean;
  vertical?: boolean;
  max?: number;
  min?: number;
  step?: number;
  value?: number;
  valueReducer?: ValueReducer;
  thumb?: React.ReactElement;
  onChange?: (event: React.ChangeEvent<{}>, value: number) => void;
  onDragEnd?: (event: React.ChangeEvent<{}>) => void;
  onDragStart?: (event: React.ChangeEvent<{}>) => void;
}

export type SliderClassKey =
  | 'root'
  | 'container'
  | 'track'
  | 'trackBefore'
  | 'trackAfter'
  | 'thumb'
  | 'thumbIconWrapper'
  | 'thumbIcon'
  | 'focused'
  | 'activated'
  | 'disabled'
  | 'vertical'
  | 'jumped';

declare const Slider: React.ComponentType<SliderProps>;

export default Slider;
