import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { SxProps } from '../styles/types';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';

export type PermanentDrawerSlot = 'root' | 'label' | 'action' | 'startDecorator' | 'endDecorator';

export interface PermanentDrawerSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType;
  /**
   * The component that renders the backdrop.
   * @default 'div'
   */
  backdrop?: React.ElementType;
  /**
   * The component that renders the content of the drawer.
   * @default 'div'
   */
  content?: React.ElementType;
}

export interface PermanentDrawerPropsColorOverrides {}
export interface PermanentDrawerPropsSizeOverrides {}
export interface PermanentDrawerPropsVariantOverrides {}

export type PermanentDrawerSlotsAndSlotProps = CreateSlotsAndSlotProps<
  PermanentDrawerSlots,
  {
    root: SlotProps<'div', {}, PermanentDrawerOwnerState>;
    backdrop: SlotProps<'div', {}, PermanentDrawerOwnerState>;
    content: SlotProps<'div', {}, PermanentDrawerOwnerState>;
  }
>;

export interface PermanentDrawerTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P &
    PermanentDrawerSlotsAndSlotProps & {
      /**
       * Side from which the drawer will appear.
       * @default 'left'
       */
      anchor?: 'left' | 'top' | 'right' | 'bottom';
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx?: SxProps;
    };
  defaultComponent: D;
}

export type PermanentDrawerProps<
  D extends React.ElementType = PermanentDrawerTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<PermanentDrawerTypeMap<P, D>, D>;

export interface PermanentDrawerOwnerState extends PermanentDrawerProps {}
