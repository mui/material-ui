import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { SxProps } from '../styles/types';
import { SlotProps, CreateSlotsAndSlotProps } from '../utils/types';

export type DialogActionsSlot = 'root';

export interface DialogActionsSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType;
}

export type DialogActionsSlotsAndSlotProps = CreateSlotsAndSlotProps<
  DialogActionsSlots,
  {
    root: SlotProps<'div', {}, DialogActionsOwnerState>;
  }
>;

export interface DialogActionsTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * Used to render icon or text elements inside the DialogActions if `src` is not set.
     * This can be an element, or just a string.
     */
    children?: React.ReactNode;
    /**
     * The CSS `flex` for the Button and its wrapper.
     */
    buttonFlex?: string | number;
    /**
     * The component orientation.
     * @default 'horizontal-reverse'
     */
    orientation?: 'horizontal' | 'horizontal-reverse' | 'vertical';
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
  } & DialogActionsSlotsAndSlotProps;
  defaultComponent: D;
}

export type DialogActionsProps<
  D extends React.ElementType = DialogActionsTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<DialogActionsTypeMap<P, D>, D>;

export interface DialogActionsOwnerState extends DialogActionsProps {}
