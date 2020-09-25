import * as React from 'react';
import { OverridableComponent, OverrideProps } from '@material-ui/core/OverridableComponent';
import { SliderTypeMap } from '../SliderUnstyled';

export type SliderProps<
  D extends React.ElementType = SliderTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<SliderTypeMap<P, D>, D>;

type SliderRootProps = NonNullable<SliderProps['componentsProps']>['root'];
type SliderMarkProps = NonNullable<SliderProps['componentsProps']>['mark'];
type SliderMarkLabelProps = NonNullable<SliderProps['componentsProps']>['markLabel'];
type SliderRailProps = NonNullable<SliderProps['componentsProps']>['rail'];
type SliderTrackProps = NonNullable<SliderProps['componentsProps']>['track'];
type SliderThumbProps = NonNullable<SliderProps['componentsProps']>['thumb'];
type SliderValueLabel = NonNullable<SliderProps['componentsProps']>['valueLabel'];

export const SliderRoot: React.FC<SliderRootProps>;
export const SliderMark: React.FC<SliderMarkProps>;
export const SliderMarkLabel: React.FC<SliderMarkLabelProps>;
export const SliderRail: React.FC<SliderRailProps>;
export const SliderTrack: React.FC<SliderTrackProps>;
export const SliderThumb: React.FC<SliderThumbProps>;
export const SliderValueLabel: React.FC<SliderValueLabel>;

/**
 *
 * API:
 *
 * - [SliderStyled API](https://material-ui.com/api/slider-styled/)
 */
declare const Slider: OverridableComponent<SliderTypeMap>;

export default Slider;
