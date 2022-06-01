import * as React from 'react';
import { OverridableStringUnion } from '@mui/types';
import { UseSwitchParameters } from '@mui/base/SwitchUnstyled';
import { ColorPaletteProp, VariantProp, SxProps } from '../styles/types';

export type SwitchSlot = 'root' | 'action' | 'input' | 'track' | 'thumb';

export interface SwitchPropsVariantOverrides {}

export interface SwitchPropsColorOverrides {}

export interface SwitchPropsSizeOverrides {}

interface SwitchOwnerState extends UseSwitchParameters {
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'neutral'
   */
  color?: OverridableStringUnion<ColorPaletteProp, SwitchPropsColorOverrides>;
  /**
   * The size of the component.
   * @default 'md'
   */
  size?: OverridableStringUnion<'sm' | 'md' | 'lg', SwitchPropsSizeOverrides>;
  /**
   * The variant to use.
   * @default 'solid'
   */
  variant?: OverridableStringUnion<VariantProp, SwitchPropsVariantOverrides>;
}

export interface SwitchProps
  extends SwitchOwnerState,
    Omit<React.HTMLAttributes<HTMLSpanElement>, keyof SwitchOwnerState> {
  /**
   * Class name applied to the root element.
   */
  className?: string;
  /**
   * The component used for the Root slot.
   * Either a string to use a HTML element or a component.
   */
  component?: React.ElementType;
  /**
   * The props used for each slot inside the Switch.
   * @default {}
   */
  componentsProps?: {
    action?: React.HTMLAttributes<HTMLDivElement>;
    thumb?: React.HTMLAttributes<HTMLSpanElement>;
    input?: React.InputHTMLAttributes<HTMLInputElement>;
    track?: React.HTMLAttributes<HTMLSpanElement>;
    startDecorator?: React.HTMLAttributes<HTMLSpanElement>;
    endDecorator?: React.HTMLAttributes<HTMLSpanElement>;
  };
  /**
   * The element that appears at the end of the switch.
   */
  endDecorator?: React.ReactNode | ((ownerState: SwitchOwnerState) => React.ReactNode);
  /**
   * The element that appears at the end of the switch.
   */
  startDecorator?: React.ReactNode | ((ownerState: SwitchOwnerState) => React.ReactNode);
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps;
}
