import { OverrideProps } from '@mui/types';
import * as React from 'react';
import { SxProps } from '../styles/types';
import { SlotProps, CreateSlotsAndSlotProps } from '../utils/types';

export type CardCoverSlot = 'root';

export interface CardCoverSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType;
}

export type CardCoverSlotsAndSlotProps = CreateSlotsAndSlotProps<
  CardCoverSlots,
  {
    root: SlotProps<'div', {}, CardCoverOwnerState>;
  }
>;

export interface CardCoverTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * Used to render icon or text elements inside the CardCover if `src` is not set.
     * This can be an element, or just a string.
     */
    children?: React.ReactNode;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
  } & CardCoverSlotsAndSlotProps;
  defaultComponent: D;
}

export type CardCoverProps<
  D extends React.ElementType = CardCoverTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<CardCoverTypeMap<P, D>, D>;

export interface CardCoverOwnerState extends CardCoverProps {}
