import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { SxProps } from '../styles/types';
import { SlotProps, CreateSlotsAndSlotProps } from '../utils/types';

export type StepSlot = 'root';

export interface StepSlots {
  /**
   * The component that renders the root.
   * @default 'li'
   */
  root?: React.ElementType;
}

export type StepSlotsAndSlotProps = CreateSlotsAndSlotProps<
  StepSlots,
  {
    root: SlotProps<'li', {}, StepOwnerState>;
  }
>;

export interface StepPropsColorOverrides {}
export interface StepPropsVariantOverrides {}
export interface StepPropsSizeOverrides {}

export interface StepTypeMap<P = {}, D extends React.ElementType = 'ol'> {
  props: P & {
    /**
     * Used to render icon or text elements inside the Step if `src` is not set.
     * This can be an element, or just a string.
     */
    children?: React.ReactNode;
    /**
     * The component orientation.
     * @default 'vertical'
     */
    orientation?: 'horizontal' | 'vertical';
    /**
     * The size of the component.
     * It accepts theme values between 'sm' and 'lg'.
     * @default 'md'
     */
    size?: OverridableStringUnion<'sm' | 'md' | 'lg', StepPropsSizeOverrides>;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
  } & StepSlotsAndSlotProps;
  defaultComponent: D;
}

export type StepProps<
  D extends React.ElementType = StepTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<StepTypeMap<P, D>, D>;

export interface StepOwnerState extends StepProps {}
