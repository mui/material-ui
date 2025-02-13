import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { ColorPaletteProp, VariantProp, SxProps, ApplyColorInversion } from '../styles/types';
import { SlotProps, CreateSlotsAndSlotProps } from '../utils/types';

export type StepIndicatorSlot = 'root';

export interface StepIndicatorSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType;
}

export type StepIndicatorSlotsAndSlotProps = CreateSlotsAndSlotProps<
  StepIndicatorSlots,
  {
    root: SlotProps<'div', {}, StepIndicatorOwnerState>;
  }
>;

export interface StepIndicatorPropsColorOverrides {}
export interface StepIndicatorPropsVariantOverrides {}

export interface StepIndicatorTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'neutral'
     */
    color?: OverridableStringUnion<ColorPaletteProp, StepIndicatorPropsColorOverrides>;
    /**
     * Used to render icon or text elements inside the StepIndicator if `src` is not set.
     * This can be an element, or just a string.
     */
    children?: React.ReactNode;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
    /**
     * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
     * @default 'soft'
     */
    variant?: OverridableStringUnion<VariantProp, StepIndicatorPropsVariantOverrides>;
  } & StepIndicatorSlotsAndSlotProps;
  defaultComponent: D;
}

export type StepIndicatorProps<
  D extends React.ElementType = StepIndicatorTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<StepIndicatorTypeMap<P, D>, D>;

export interface StepIndicatorOwnerState extends ApplyColorInversion<StepIndicatorProps> {}
