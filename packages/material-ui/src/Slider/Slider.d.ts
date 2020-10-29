import * as React from 'react';
import { SxProps } from '@material-ui/core/Box';
import { ExtendSliderUnstyledTypeMap, ExtendSliderUnstyled } from '@material-ui/unstyled';
import { OverrideProps } from '../OverridableComponent';

export type SliderTypeMap<
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

type SliderRootProps = NonNullable<SliderTypeMap['props']['componentsProps']>['root'];
export const SliderRoot: React.FC<SliderRootProps>;

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
  /** Styles applied to the root element. */
  | 'root'
  /** Styles applied to the root element if `color="primary"`. */
  | 'colorPrimary'
  /** Styles applied to the root element if `color="secondary"`. */
  | 'colorSecondary'
  /** Styles applied to the root element if `marks` is provided with at least one label. */
  | 'marked'
  /** Pseudo-class applied to the root element if `orientation="vertical"`. */
  | 'vertical'
  /** Pseudo-class applied to the root and thumb element if `disabled={true}`. */
  | 'disabled'
  /** Styles applied to the rail element. */
  | 'rail'
  /** Styles applied to the track element. */
  | 'track'
  /** Styles applied to the track element if `track={false}`. */
  | 'trackFalse'
  /** Styles applied to the track element if `track="inverted"`. */
  | 'trackInverted'
  /** Styles applied to the thumb element. */
  | 'thumb'
  /** Styles applied to the thumb element if `color="primary"`. */
  | 'thumbColorPrimary'
  /** Styles applied to the thumb element if `color="secondary"`. */
  | 'thumbColorSecondary'
  /** Pseudo-class applied to the thumb element if it's active. */
  | 'active'
  /** Pseudo-class applied to the thumb element if keyboard focused. */
  | 'focusVisible'
  /** Styles applied to the thumb label element. */
  | 'valueLabel'
  /** Styles applied to the mark element. */
  | 'mark'
  /** Styles applied to the mark element if active (depending on the value). */
  | 'markActive'
  /** Styles applied to the mark label element. */
  | 'markLabel'
  /** Styles applied to the mark label element if active (depending on the value). */
  | 'markLabelActive';

export type SliderProps<
  D extends React.ElementType = SliderTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<SliderTypeMap<D, P>, D>;

export default Slider;
