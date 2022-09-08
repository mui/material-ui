import { SlotComponentProps } from '@mui/base/utils';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import * as React from 'react';
import { ColorPaletteProp, SxProps, VariantProp } from '../styles/types';

export type CircularProgressSlot = 'root' | 'svg' | 'track' | 'progress';

export interface CircularProgressPropsColorOverrides {}
export interface CircularProgressPropsSizeOverrides {}
export interface CircularProgressPropsVariantOverrides {}

interface ComponentsProps {
  root?: SlotComponentProps<'span', { sx?: SxProps }, CircularProgressOwnerState>;
  svg?: SlotComponentProps<'svg', { sx?: SxProps }, CircularProgressOwnerState>;
  track?: SlotComponentProps<'circle', { sx?: SxProps }, CircularProgressOwnerState>;
  progress?: SlotComponentProps<'circle', { sx?: SxProps }, CircularProgressOwnerState>;
}

export interface CircularProgressTypeMap<P = {}, D extends React.ElementType = 'span'> {
  props: P & {
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'primary'
     */
    color?: OverridableStringUnion<ColorPaletteProp, CircularProgressPropsColorOverrides>;
    /**
     * The props used for each slot inside the CircularProgress.
     * @default {}
     */
    componentsProps?: ComponentsProps;
    /**
     * The boolean to select a variant.
     * Use indeterminate when there is no progress value.
     * @default false
     */
    determinate?: true | false;
    /**
     * The size of the component.
     * It accepts theme values between 'sm' and 'lg'.
     * @default 'md'
     */
    size?: OverridableStringUnion<'sm' | 'md' | 'lg', CircularProgressPropsSizeOverrides>;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
    /**
     * The thickness of the circle.
     */
    thickness?: number;
    /**
     * The value of the progress indicator for the determinate variant.
     * Value between 0 and 100.
     *
     * For indeterminate, @default 25
     */
    value?: number;
    /**
     * The variant to use.
     * @default 'soft'
     */
    variant?: OverridableStringUnion<VariantProp, CircularProgressPropsVariantOverrides>;
  };
  defaultComponent: D;
}

export type CircularProgressProps<
  D extends React.ElementType = CircularProgressTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<CircularProgressTypeMap<P, D>, D>;

export interface CircularProgressOwnerState extends CircularProgressProps {
  /**
   * @internal the explicit size on the instance: <CircularProgress size="..." />
   */
  instanceSize: CircularProgressProps['size'];
}
