import * as React from 'react';
import { SxProps } from '@material-ui/system';
import {
  ExtendSliderUnstyledTypeMap,
  ExtendSliderUnstyled,
} from '@material-ui/unstyled/SliderUnstyled';
import { Theme } from '@material-ui/core/styles';
import { OverrideProps } from '../OverridableComponent';

export type SliderTypeMap<
  D extends React.ElementType = 'span',
  P = {}
> = ExtendSliderUnstyledTypeMap<{
  props: P & {
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
  };
  defaultComponent: D;
}>;

type SliderRootProps = NonNullable<SliderTypeMap['props']['componentsProps']>['root'];
type SliderMarkProps = NonNullable<SliderTypeMap['props']['componentsProps']>['mark'];
type SliderMarkLabelProps = NonNullable<SliderTypeMap['props']['componentsProps']>['markLabel'];
type SliderRailProps = NonNullable<SliderTypeMap['props']['componentsProps']>['rail'];
type SliderTrackProps = NonNullable<SliderTypeMap['props']['componentsProps']>['track'];
type SliderThumbProps = NonNullable<SliderTypeMap['props']['componentsProps']>['thumb'];
type SliderValueLabel = NonNullable<SliderTypeMap['props']['componentsProps']>['valueLabel'];

export const SliderRoot: React.FC<SliderRootProps>;
export const SliderMark: React.FC<SliderMarkProps>;
export const SliderMarkLabel: React.FC<SliderMarkLabelProps>;
export const SliderRail: React.FC<SliderRailProps>;
export const SliderTrack: React.FC<SliderTrackProps>;
export const SliderThumb: React.FC<SliderThumbProps>;
export const SliderValueLabel: React.FC<SliderValueLabel>;

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
declare const Slider: ExtendSliderUnstyled<SliderTypeMap>;

export type SliderClassKey = keyof NonNullable<SliderTypeMap['props']['classes']>;

export type SliderProps<
  D extends React.ElementType = SliderTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<SliderTypeMap<D, P>, D>;

export default Slider;
