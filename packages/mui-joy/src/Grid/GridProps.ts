import type * as React from 'react';
import type { OverrideProps } from '@mui/types';
import type { GridBaseProps } from '@mui/system/Grid';
import type { SxProps, SystemProps } from '../styles/types';
import type { SlotProps, CreateSlotsAndSlotProps } from '../utils/types';

export type GridSlot = 'root';

export interface GridSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType;
}

export type GridSlotsAndSlotProps = CreateSlotsAndSlotProps<
  GridSlots,
  {
    root: SlotProps<'div', {}, GridOwnerState>;
  }
>;

export interface GridTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & GridBaseProps & GridSlotsAndSlotProps & { sx?: SxProps } & SystemProps;
  defaultComponent: D;
}

export type GridProps<
  D extends React.ElementType = GridTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<GridTypeMap<P, D>, D>;

export interface GridOwnerState extends GridProps {}
