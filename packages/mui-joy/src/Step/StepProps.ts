import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { SxProps } from '../styles/types';
import { SlotProps, CreateSlotsAndSlotProps } from '../utils/types';

export type StepSlot = 'root';

export interface StepSlots {
  /**
   * The component that renders the root.
   * @default 'li'
   */
  root?: React.ElementType;
  /**
   * The component that renders the indicator.
   * @default 'div'
   */
  indicator?: React.ElementType;
}

export type StepSlotsAndSlotProps = CreateSlotsAndSlotProps<
  StepSlots,
  {
    root: SlotProps<'li', {}, StepOwnerState>;
    indicator: SlotProps<'div', {}, StepOwnerState>;
  }
>;

export interface StepTypeMap<P = {}, D extends React.ElementType = 'li'> {
  props: P & {
    /**
     * If `true`, the active className is appended.
     * You can customize the active state from the Stepper's `sx` prop.
     * @default false
     */
    active?: boolean;
    /**
     * Used to render icon or text elements inside the Step if `src` is not set.
     * This can be an element, or just a string.
     */
    children?: React.ReactNode;
    /**
     * If `true`, the completed className is appended.
     * You can customize the active state from the Stepper's `sx` prop.
     * @default false
     */
    completed?: boolean;
    /**
     * If `true`, the active className is appended.
     * You can customize the active state from the Stepper's `sx` prop.
     * @default false
     */
    disabled?: boolean;
    /**
     * The indicator to display. If provided, a wrapper element will be used.
     */
    indicator?: React.ReactNode;
    /**
     * The component orientation.
     * @default 'horizontal'
     */
    orientation?: 'horizontal' | 'vertical';
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
