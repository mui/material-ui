import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { ModalOwnProps } from '../Modal';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';

export type DrawerSlot = 'root' | 'label' | 'action' | 'startDecorator' | 'endDecorator';

export interface DrawerSlots {
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

export interface DrawerPropsColorOverrides {}
export interface DrawerPropsSizeOverrides {}
export interface DrawerPropsVariantOverrides {}

export type DrawerSlotsAndSlotProps = CreateSlotsAndSlotProps<
  DrawerSlots,
  {
    root: SlotProps<'div', {}, DrawerOwnerState>;
    backdrop: SlotProps<'div', {}, DrawerOwnerState>;
    content: SlotProps<'div', {}, DrawerOwnerState>;
  }
>;

export interface DrawerTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P &
    Omit<ModalOwnProps, 'keepMounted'> &
    DrawerSlotsAndSlotProps & {
      /**
       * Side from which the drawer will appear.
       * @default 'left'
       */
      anchor?: 'left' | 'top' | 'right' | 'bottom';
    };
  defaultComponent: D;
}

export type DrawerProps<
  D extends React.ElementType = DrawerTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<DrawerTypeMap<P, D>, D>;

export interface DrawerOwnerState extends DrawerProps {}
