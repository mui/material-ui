import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { ColorPaletteProp, SxProps, VariantProp, ApplyColorInversion } from '../styles/types';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';

export type CircularProgressSlot = 'root' | 'svg' | 'track' | 'progress';

export interface CircularProgressSlots {
  /**
   * The component that renders the root.
   * @default 'span'
   */
  root?: React.ElementType;
  /**
   * The component that renders the svg.
   * @default 'svg'
   */
  svg?: React.ElementType;
  /**
   * The component that renders the track.
   * @default 'circle'
   */
  track?: React.ElementType;
  /**
   * The component that renders the progress.
   * @default 'circle'
   */
  progress?: React.ElementType;
}

export interface CircularProgressPropsColorOverrides {}
export interface CircularProgressPropsSizeOverrides {}
export interface CircularProgressPropsVariantOverrides {}

export type CircularProgressSlotsAndSlotProps = CreateSlotsAndSlotProps<
  CircularProgressSlots,
  {
    root: SlotProps<'span', {}, CircularProgressOwnerState>;
    svg: SlotProps<'svg', {}, CircularProgressOwnerState>;
    track: SlotProps<'circle', {}, CircularProgressOwnerState>;
    progress: SlotProps<'circle', {}, CircularProgressOwnerState>;
  }
>;

export interface CircularProgressTypeMap<P = {}, D extends React.ElementType = 'span'> {
  props: P &
    CircularProgressSlotsAndSlotProps & {
      /**
       * The color of the component. It supports those theme colors that make sense for this component.
       * @default 'primary'
       */
      color?: OverridableStringUnion<ColorPaletteProp, CircularProgressPropsColorOverrides>;
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
       * @default determinate ? 0 : 25
       */
      value?: number;
      /**
       * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
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

export interface CircularProgressOwnerState extends ApplyColorInversion<CircularProgressProps> {
  /**
   * @internal the explicit size on the instance: <CircularProgress size="..." />
   */
  instanceSize: CircularProgressProps['size'];
}
