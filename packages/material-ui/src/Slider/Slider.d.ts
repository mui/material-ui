import * as React from 'react';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { SliderTypeMap } from './SliderBase';

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

export const SliderRoot: React.FC<SliderProps>;
export const SliderMark: React.FC<
  SliderProps & {
    markActive?: boolean;
  }
>;
export const SliderMarkLabel: React.FC<
  SliderProps & {
    markLabelActive?: boolean;
  }
>;
export const SliderRail: React.FC<SliderProps>;
export const SliderTrack: React.FC<SliderProps>;
export const SliderThumb: React.FC<
  SliderProps & {
    active?: boolean;
    focusVisible?: boolean;
  }
>;
export const SliderValueLabel: React.FC<
  SliderProps & {
    index?: number;
    open?: boolean;
  }
>;

export default Slider;
