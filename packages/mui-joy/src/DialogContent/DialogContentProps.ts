import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { SxProps } from '../styles/types';
import { SlotProps, CreateSlotsAndSlotProps } from '../utils/types';

export type DialogContentSlot = 'root';

export interface DialogContentSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType;
}

export type DialogContentSlotsAndSlotProps = CreateSlotsAndSlotProps<
  DialogContentSlots,
  {
    root: SlotProps<'div', {}, DialogContentOwnerState>;
  }
>;

export interface DialogContentPropsColorOverrides {}
export interface DialogContentPropsVariantOverrides {}

export interface DialogContentTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * Used to render icon or text elements inside the CardContent if `src` is not set.
     * This can be an element, or just a string.
     */
    children?: React.ReactNode;
    /**
     * The component orientation.
     * @default 'vertical'
     */
    orientation?: 'horizontal' | 'vertical';
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
  } & DialogContentSlotsAndSlotProps;
  defaultComponent: D;
}

export type DialogContentProps<
  D extends React.ElementType = DialogContentTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<DialogContentTypeMap<P, D>, D>;

export interface DialogContentOwnerState extends DialogContentProps {}
