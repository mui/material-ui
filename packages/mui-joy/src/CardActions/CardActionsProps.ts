import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { SxProps } from '../styles/types';
import { SlotProps, CreateSlotsAndSlotProps } from '../utils/types';

export type CardActionsSlot = 'root';

export interface CardActionsSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType;
}

export type CardActionsSlotsAndSlotProps = CreateSlotsAndSlotProps<
  CardActionsSlots,
  {
    root: SlotProps<'div', {}, CardActionsOwnerState>;
  }
>;

export interface CardActionsTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * Used to render icon or text elements inside the CardActions if `src` is not set.
     * This can be an element, or just a string.
     */
    children?: React.ReactNode;
    /**
     * The CSS `flex` for the Button and its wrapper.
     */
    buttonFlex?: string | number;
    /**
     * The component orientation.
     * @default 'horizontal'
     */
    orientation?: 'horizontal' | 'horizontal-reverse' | 'vertical';
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
  } & CardActionsSlotsAndSlotProps;
  defaultComponent: D;
}

export type CardActionsProps<
  D extends React.ElementType = CardActionsTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<CardActionsTypeMap<P, D>, D>;

export interface CardActionsOwnerState extends CardActionsProps {}
