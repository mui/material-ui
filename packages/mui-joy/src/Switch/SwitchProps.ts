import * as React from 'react';
import { UseSwitchParameters } from '@mui/base/useSwitch';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { ColorPaletteProp, SxProps, VariantProp, ApplyColorInversion } from '../styles/types';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';

export type SwitchSlot =
  | 'root'
  | 'action'
  | 'input'
  | 'track'
  | 'thumb'
  | 'startDecorator'
  | 'endDecorator';

export interface SwitchCssVariables {
  /**
   * The background color of the track slot.
   */
  trackBackground?: string;
  /**
   * The color of the track slot.
   */
  trackColor?: string;
  /**
   * The border color of the track slot.
   */
  trackBorderColor?: string;
  /**
   * The background color of the thumb slot.
   */
  thumbBackground?: string;
  /**
   * The color of the thumb slot.
   */
  thumbColor?: string;
  /**
   * The radius of the track slot.
   */
  trackRadius?: string;
  /**
   * The shadow of the thumb slot.
   */
  thumbShadow?: string;
  /**
   * The width of the track slot.
   */
  trackWidth?: string;
  /**
   * The height of the track slot.
   */
  trackHeight?: string;
  /**
   * The height and width of the track slot.
   */
  thumbSize?: string;
  /**
   * The gap between the Switch and the decorators.
   */
  gap?: string;
}

export interface SwitchSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType;
  /**
   * The component that renders the thumb.
   * @default 'span'
   */
  thumb?: React.ElementType;
  /**
   * The component that renders the action.
   * @default 'div'
   */
  action?: React.ElementType;
  /**
   * The component that renders the input.
   * @default 'input'
   */
  input?: React.ElementType;
  /**
   * The component that renders the track.
   * @default 'span'
   */
  track?: React.ElementType;
  /**
   * The component that renders the start decorator.
   * @default 'span'
   */
  startDecorator?: React.ElementType;
  /**
   * The component that renders the end decorator.
   * @default 'span'
   */
  endDecorator?: React.ElementType;
}

export interface SwitchPropsVariantOverrides {}
export interface SwitchPropsColorOverrides {}
export interface SwitchPropsSizeOverrides {}

export type SwitchSlotsAndSlotProps = CreateSlotsAndSlotProps<
  SwitchSlots,
  {
    root: SlotProps<'div', {}, SwitchOwnerState>;
    thumb: SlotProps<'span', {}, SwitchOwnerState>;
    action: SlotProps<'div', {}, SwitchOwnerState>;
    input: SlotProps<'input', {}, SwitchOwnerState>;
    track: SlotProps<'span', {}, SwitchOwnerState>;
    startDecorator: SlotProps<'span', {}, SwitchOwnerState>;
    endDecorator: SlotProps<'span', {}, SwitchOwnerState>;
  }
>;

export interface SwitchTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P &
    UseSwitchParameters & {
      /**
       * The color of the component. It supports those theme colors that make sense for this component.
       * @default 'neutral'
       */
      color?: OverridableStringUnion<ColorPaletteProp, SwitchPropsColorOverrides>;
      /**
       * The element that appears at the end of the switch.
       */
      endDecorator?: React.ReactNode | ((ownerState: SwitchOwnerState) => React.ReactNode);
      /**
       * The size of the component.
       * @default 'md'
       */
      size?: OverridableStringUnion<'sm' | 'md' | 'lg', SwitchPropsSizeOverrides>;
      /**
       * The element that appears at the end of the switch.
       */
      startDecorator?: React.ReactNode | ((ownerState: SwitchOwnerState) => React.ReactNode);
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx?: SxProps;
      /**
       * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
       * @default 'solid'
       */
      variant?: OverridableStringUnion<VariantProp, SwitchPropsVariantOverrides>;
      /**
       * The component's CSS variables.
       */
      vx?: SwitchCssVariables;
    } & SwitchSlotsAndSlotProps;
  defaultComponent: D;
}

export type SwitchProps<
  D extends React.ElementType = SwitchTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<SwitchTypeMap<P, D>, D>;

export interface SwitchOwnerState extends ApplyColorInversion<Omit<SwitchProps, 'vx'>> {
  /**
   * If `true`, the switch's focus is visible.
   */
  focusVisible?: boolean;
}
