import * as React from 'react';
import { SxProps } from '@material-ui/core/Box';
import {
  ExtendSliderUnstyledTypeMap,
  ExtendSliderUnstyled,
} from '@material-ui/unstyled';
import { OverrideProps } from '../OverridableComponent';

export type SliderTypeMap<
  D extends React.ElementType = 'span',
  P = {}
> = ExtendSliderUnstyledTypeMap<{
  props: P & {
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: {
      /** Class name applied to the root element. */
      root?: string;
      /** Class name applied to the root element if `color="primary"`. */
      colorPrimary?: string;
      /** Class name applied to the root element if `color="secondary"`. */
      colorSecondary?: string;
      /** Class name applied to the root element if `marks` is provided with at least one label. */
      marked?: string;
      /** Class name applied to the root element if `orientation="vertical"`. */
      vertical?: string;
      /** Pseudo-class applied to the root and thumb element if `disabled={true}`. */
      disabled?: string;
      /** Class name applied to the rail element. */
      rail?: string;
      /** Class name applied to the track element. */
      track?: string;
      /** Class name applied to the track element if `track={false}`. */
      trackFalse?: string;
      /** Class name applied to the track element if `track="inverted"`. */
      trackInverted?: string;
      /** Class name applied to the thumb element. */
      thumb?: string;
      /** Class name applied to the thumb element if `color="primary"`. */
      thumbColorPrimary?: string;
      /** Class name applied to the thumb element if `color="secondary"`. */
      thumbColorSecondary?: string;
      /** Pseudo-class applied to the thumb element if it's active. */
      active?: string;
      /** Pseudo-class applied to the thumb element if keyboard focused. */
      focusVisible?: string;
      /** Class name applied to the thumb label element. */
      valueLabel?: string;
      /** Class name applied to the mark element. */
      mark?: string;
      /** Class name applied to the mark element if active (depending on the value). */
      markActive?: string;
      /** Class name applied to the mark label element. */
      markLabel?: string;
      /** Class name applied to the mark label element if active (depending on the value). */
      markLabelActive?: string;
    };
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
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

export type SliderClassKey =
  | 'root'
  | 'colorPrimary'
  | 'colorSecondary'
  | 'marked'
  | 'vertical'
  | 'disabled'
  | 'rail'
  | 'track'
  | 'trackFalse'
  | 'trackInverted'
  | 'thumb'
  | 'thumbColorPrimary'
  | 'thumbColorSecondary'
  | 'active'
  | 'focusVisible'
  | 'valueLabel'
  | 'mark'
  | 'markActive'
  | 'markLabel'
  | 'markLabelActive';

export type SliderProps<
  D extends React.ElementType = SliderTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<SliderTypeMap<D, P>, D>;

export default Slider;
