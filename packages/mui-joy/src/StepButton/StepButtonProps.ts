import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { SxProps } from '../styles/types';
import { SlotProps, CreateSlotsAndSlotProps } from '../utils/types';

export type StepButtonSlot = 'root';

export interface StepButtonSlots {
  /**
   * The component that renders the root.
   * @default 'button'
   */
  root?: React.ElementType;
}

export type StepButtonSlotsAndSlotProps = CreateSlotsAndSlotProps<
  StepButtonSlots,
  {
    root: SlotProps<'button', {}, StepButtonOwnerState>;
  }
>;

export interface StepButtonTypeMap<P = {}, D extends React.ElementType = 'button'> {
  props: P & {
    /**
     * Used to render icon or text elements inside the StepButton if `src` is not set.
     * This can be an element, or just a string.
     */
    children?: React.ReactNode;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
  } & StepButtonSlotsAndSlotProps;
  defaultComponent: D;
}

export type StepButtonProps<
  D extends React.ElementType = StepButtonTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<StepButtonTypeMap<P, D>, D>;

export interface StepButtonOwnerState extends StepButtonProps {}
