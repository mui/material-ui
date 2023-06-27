import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { SxProps } from '../styles/types';
import { SlotProps, CreateSlotsAndSlotProps } from '../utils/types';

export type ListItemDecoratorSlot = 'root';

export interface ListItemDecoratorSlots {
  /**
   * The component that renders the root.
   * @default 'span'
   */
  root?: React.ElementType;
}

export type ListItemDecoratorSlotsAndSlotProps = CreateSlotsAndSlotProps<
  ListItemDecoratorSlots,
  {
    root: SlotProps<'span', {}, ListItemDecoratorOwnerState>;
  }
>;

export interface ListItemDecoratorTypeMap<P = {}, D extends React.ElementType = 'span'> {
  props: P & {
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
  } & ListItemDecoratorSlotsAndSlotProps;
  defaultComponent: D;
}

export type ListItemDecoratorProps<
  D extends React.ElementType = ListItemDecoratorTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<ListItemDecoratorTypeMap<P, D>, D>;

export interface ListItemDecoratorOwnerState extends ListItemDecoratorProps {
  /**
   * @internal
   * The orientation of the parent ListItemButton.
   */
  parentOrientation: 'horizontal' | 'vertical';
}
