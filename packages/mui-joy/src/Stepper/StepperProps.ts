import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { SxProps } from '../styles/types';
import { SlotProps, CreateSlotsAndSlotProps } from '../utils/types';

export type StepperSlot = 'root';

export interface StepperSlots {
  /**
   * The component that renders the root.
   * @default 'ol'
   */
  root?: React.ElementType;
}

export type StepperSlotsAndSlotProps = CreateSlotsAndSlotProps<
  StepperSlots,
  {
    root: SlotProps<'ol', {}, StepperOwnerState>;
  }
>;

export interface StepperPropsSizeOverrides {}

export interface StepperTypeMap<P = {}, D extends React.ElementType = 'ol'> {
  props: P & {
    /**
     * Used to render icon or text elements inside the Stepper if `src` is not set.
     * This can be an element, or just a string.
     */
    children?: React.ReactNode;
    /**
     * The component orientation.
     * @default 'horizontal'
     */
    orientation?: 'horizontal' | 'vertical';
    /**
     * The size of the component.
     * It accepts theme values between 'sm' and 'lg'.
     * @default 'md'
     */
    size?: OverridableStringUnion<'sm' | 'md' | 'lg', StepperPropsSizeOverrides>;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
  } & StepperSlotsAndSlotProps;
  defaultComponent: D;
}

export type StepperProps<
  D extends React.ElementType = StepperTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<StepperTypeMap<P, D>, D>;

export interface StepperOwnerState extends StepperProps {}
