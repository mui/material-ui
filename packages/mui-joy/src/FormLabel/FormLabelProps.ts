import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { SxProps } from '../styles/types';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';

export type FormLabelSlot = 'root' | 'asterisk';

export interface FormLabelSlots {
  /**
   * The component that renders the root.
   * @default 'label'
   */
  root?: React.ElementType;
  /**
   * The component that renders the asterisk.
   * @default 'span'
   */
  asterisk?: React.ElementType;
}

export type FormLabelSlotsAndSlotProps = CreateSlotsAndSlotProps<
  FormLabelSlots,
  {
    root: SlotProps<'label', {}, FormLabelOwnerState>;
    asterisk: SlotProps<'span', {}, FormLabelOwnerState>;
  }
>;

export interface FormLabelTypeMap<P = {}, D extends React.ElementType = 'label'> {
  props: P &
    FormLabelSlotsAndSlotProps & {
      /**
       * The content of the component.
       */
      children?: React.ReactNode;
      /**
       * The asterisk is added if required=`true`
       */
      required?: boolean;
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx?: SxProps;
    };
  defaultComponent: D;
}

export type FormLabelProps<
  D extends React.ElementType = FormLabelTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<FormLabelTypeMap<P, D>, D>;

export interface FormLabelOwnerState extends FormLabelProps {}
