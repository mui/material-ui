import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { ColorPaletteProp, SxProps, VariantProp, ApplyColorInversion } from '../styles/types';
import { SlotProps, CreateSlotsAndSlotProps } from '../utils/types';

export type LinearProgressSlot = 'root';

export interface LinearProgressSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType;
}

export type LinearProgressSlotsAndSlotProps = CreateSlotsAndSlotProps<
  LinearProgressSlots,
  {
    root: SlotProps<'div', {}, LinearProgressOwnerState>;
  }
>;

export interface LinearProgressPropsColorOverrides {}
export interface LinearProgressPropsSizeOverrides {}
export interface LinearProgressPropsVariantOverrides {}

export interface LinearProgressTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'primary'
     */
    color?: OverridableStringUnion<ColorPaletteProp, LinearProgressPropsColorOverrides>;
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
     * @default determinate ? 0 : 25
     */
    value?: number;
    /**
     * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
     * @default 'soft'
     */
    variant?: OverridableStringUnion<VariantProp, LinearProgressPropsVariantOverrides>;
  } & LinearProgressSlotsAndSlotProps;
  defaultComponent: D;
}

export type LinearProgressProps<
  D extends React.ElementType = LinearProgressTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<LinearProgressTypeMap<P, D>, D>;

export interface LinearProgressOwnerState extends ApplyColorInversion<LinearProgressProps> {
  /**
   * @internal the explicit size on the instance: <LinearProgress size="..." />
   */
  instanceSize: LinearProgressProps['size'];
}
