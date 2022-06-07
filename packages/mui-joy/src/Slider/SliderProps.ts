import { ExtendSliderUnstyledTypeMap } from '@mui/base/SliderUnstyled';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import * as React from 'react';
import { ColorPaletteProp, SxProps } from '../styles/types';

export type SliderSlot = 'root' | 'mark' | 'markLabel' | 'rail' | 'track' | 'thumb' | 'valueLabel';

export interface SliderPropsColorOverrides {}
export interface SliderPropsSizeOverrides {}

export type SliderTypeMap<
  D extends React.ElementType = 'span',
  P = {},
> = ExtendSliderUnstyledTypeMap<{
  props: P & {
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'primary'
     */
    color?: OverridableStringUnion<ColorPaletteProp, SliderPropsColorOverrides>;
    /**
     * The size of the component.
     * It accepts theme values between 'sm' and 'lg'.
     * @default 'md'
     */
    size?: OverridableStringUnion<'sm' | 'md' | 'lg', SliderPropsSizeOverrides>;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
  };
  defaultComponent: D;
}>;

export type SliderRootProps = NonNullable<SliderTypeMap['props']['componentsProps']>['root'];
export type SliderMarkProps = NonNullable<SliderTypeMap['props']['componentsProps']>['mark'];
export type SliderMarkLabelProps = NonNullable<
  SliderTypeMap['props']['componentsProps']
>['markLabel'];
export type SliderRailProps = NonNullable<SliderTypeMap['props']['componentsProps']>['rail'];
export type SliderTrackProps = NonNullable<SliderTypeMap['props']['componentsProps']>['track'];
export type SliderThumbProps = NonNullable<SliderTypeMap['props']['componentsProps']>['thumb'];
export type SliderValueLabelProps = NonNullable<
  SliderTypeMap['props']['componentsProps']
>['valueLabel'];

export type SliderProps<
  D extends React.ElementType = SliderTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<SliderTypeMap<D, P>, D>;
