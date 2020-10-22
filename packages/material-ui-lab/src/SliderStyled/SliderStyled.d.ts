import * as React from 'react';
import { SxProps } from '@material-ui/core/Box';
import { ExtendSliderUnstyledTypeMap, ExtendSliderUnstyled } from '../SliderUnstyled';

export type SliderStyledTypeMap<
  D extends React.ElementType = 'span',
  P = {}
> = ExtendSliderUnstyledTypeMap<{
  props: P & {
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
  };
  defaultComponent: D;
}>;

type SliderRootProps = NonNullable<SliderStyledTypeMap['props']['componentsProps']>['root'];
type SliderMarkProps = NonNullable<SliderStyledTypeMap['props']['componentsProps']>['mark'];
type SliderMarkLabelProps = NonNullable<
  SliderStyledTypeMap['props']['componentsProps']
>['markLabel'];
type SliderRailProps = NonNullable<SliderStyledTypeMap['props']['componentsProps']>['rail'];
type SliderTrackProps = NonNullable<SliderStyledTypeMap['props']['componentsProps']>['track'];
type SliderThumbProps = NonNullable<SliderStyledTypeMap['props']['componentsProps']>['thumb'];
type SliderValueLabel = NonNullable<SliderStyledTypeMap['props']['componentsProps']>['valueLabel'];

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
 * - [Slider Styled](https://material-ui.com/components/slider-styled/)
 *
 * API:
 *
 * - [SliderStyled API](https://material-ui.com/api/slider-styled/)
 */
declare const Slider: ExtendSliderUnstyled<SliderStyledTypeMap>;

export default Slider;
