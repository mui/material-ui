import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { SxProps } from '../styles/types';
import { SlotProps, CreateSlotsAndSlotProps } from '../utils/types';

export type FormHelperTextSlot = 'root';

export interface FormHelperTextSlots {
  /**
   * The component that renders the root.
   * @default 'p'
   */
  root?: React.ElementType;
}

export type FormHelperTextSlotsAndSlotProps = CreateSlotsAndSlotProps<
  FormHelperTextSlots,
  {
    root: SlotProps<'p', {}, FormHelperTextOwnerState>;
  }
>;

export interface FormHelperTextTypeMap<P = {}, D extends React.ElementType = 'p'> {
  props: P & {
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
  } & FormHelperTextSlotsAndSlotProps;
  defaultComponent: D;
}

export type FormHelperTextProps<
  D extends React.ElementType = FormHelperTextTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<FormHelperTextTypeMap<P, D>, D>;

export interface FormHelperTextOwnerState extends FormHelperTextProps {}
