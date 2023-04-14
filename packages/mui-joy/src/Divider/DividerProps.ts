import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { SxProps } from '../styles/types';
import { SlotProps, CreateSlotsAndSlotProps } from '../utils/types';

export type DividerSlot = 'root';

export interface DividerSlots {
  /**
   * The component that renders the root.
   * @default 'hr'
   */
  root?: React.ElementType;
}

export type DividerSlotsAndSlotProps = CreateSlotsAndSlotProps<
  DividerSlots,
  {
    root: SlotProps<'hr', {}, DividerOwnerState>;
  }
>;

export interface DividerInsetOverrides {}

export interface DividerTypeMap<P = {}, D extends React.ElementType = 'hr'> {
  props: P & {
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * Class name applied to the divider to shrink or stretch the line based on the orientation.
     */
    inset?: OverridableStringUnion<'none' | 'context', DividerInsetOverrides>;
    /**
     * The component orientation.
     * @default 'horizontal'
     */
    orientation?: 'horizontal' | 'vertical';
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
  } & DividerSlotsAndSlotProps;
  defaultComponent: D;
}

export type DividerProps<
  D extends React.ElementType = DividerTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<DividerTypeMap<P, D>, D>;

export interface DividerOwnerState extends DividerProps {}
