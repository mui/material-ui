import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { SlotComponentProps } from '@mui/base/utils';
import { UseSwitchParameters } from '@mui/base/SwitchUnstyled';
import { ColorPaletteProp, VariantProp, SxProps } from '../styles/types';

export type SwitchSlot = 'root' | 'action' | 'input' | 'track' | 'thumb';

export interface SwitchPropsVariantOverrides {}

export interface SwitchPropsColorOverrides {}

export interface SwitchPropsSizeOverrides {}

interface ComponentsProps {
  root?: SlotComponentProps<'div', { sx?: SxProps }, SwitchOwnerState>;
  thumb?: SlotComponentProps<'span', { sx?: SxProps }, SwitchOwnerState>;
  action?: SlotComponentProps<'div', { sx?: SxProps }, SwitchOwnerState>;
  input?: SlotComponentProps<'button', { sx?: SxProps }, SwitchOwnerState>;
  track?: SlotComponentProps<'span', { sx?: SxProps }, SwitchOwnerState>;
  startDecorator?: SlotComponentProps<'span', { sx?: SxProps }, SwitchOwnerState>;
  endDecorator?: SlotComponentProps<'span', { sx?: SxProps }, SwitchOwnerState>;
}

export interface SwitchTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P &
    UseSwitchParameters & {
      /**
       * The color of the component. It supports those theme colors that make sense for this component.
       * @default 'neutral'
       */
      color?: OverridableStringUnion<ColorPaletteProp, SwitchPropsColorOverrides>;
      /**
       * The props used for each slot inside the Switch.
       * @default {}
       */
      componentsProps?: ComponentsProps;
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
       * The variant to use.
       * @default 'solid'
       */
      variant?: OverridableStringUnion<VariantProp, SwitchPropsVariantOverrides>;
    };
  defaultComponent: D;
}

export type SwitchProps<
  D extends React.ElementType = SwitchTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<SwitchTypeMap<P, D>, D>;

export interface SwitchOwnerState extends SwitchProps {
  /**
   * If `true`, the switch's focus is visible.
   */
  focusVisible: boolean;
}
