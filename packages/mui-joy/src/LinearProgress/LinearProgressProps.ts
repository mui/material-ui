import { SlotComponentProps } from '@mui/base/utils';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import * as React from 'react';
import { ColorPaletteProp, SxProps, VariantProp } from '../styles/types';

export type LinearProgressSlot = 'root' | 'track' | 'progress1' | 'progress2';

export interface LinearProgressPropsColorOverrides {}
export interface LinearProgressPropsSizeOverrides {}
export interface LinearProgressPropsVariantOverrides {}

interface ComponentsProps {
  root?: SlotComponentProps<'span', { sx?: SxProps }, LinearProgressOwnerState>;
  track?: SlotComponentProps<'span', { sx?: SxProps }, LinearProgressOwnerState>;
  progress1?: SlotComponentProps<'span', { sx?: SxProps }, LinearProgressOwnerState>;
  progress2?: SlotComponentProps<'span', { sx?: SxProps }, LinearProgressOwnerState>;
}

export interface LinearProgressTypeMap<P = {}, D extends React.ElementType = 'span'> {
  props: P & {
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'primary'
     */
    color?: OverridableStringUnion<ColorPaletteProp, LinearProgressPropsColorOverrides>;
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
    size?: OverridableStringUnion<'sm' | 'md' | 'lg', LinearProgressPropsSizeOverrides>;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
    /**
     * The thickness of the bar.
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
    variant?: OverridableStringUnion<VariantProp, LinearProgressPropsVariantOverrides>;
  };
  defaultComponent: D;
}

export type LinearProgressProps<
  D extends React.ElementType = LinearProgressTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<LinearProgressTypeMap<P, D>, D>;

export interface LinearProgressOwnerState extends LinearProgressProps {
  /**
   * @internal the explicit size on the instance: <LinearProgress size="..." />
   */
  instanceSize: LinearProgressProps['size'];
}
