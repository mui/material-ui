import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { SxProps } from '../styles/types';
import { SlotComponentProps } from '../utils/types';

export type FormLabelSlot = 'root' | 'asterisk';

interface ComponentsProps {
  root?: SlotComponentProps<'label', {}, FormLabelOwnerState>;
  asterisk?: SlotComponentProps<'span', {}, FormLabelOwnerState>;
}

export interface FormLabelTypeMap<P = {}, D extends React.ElementType = 'label'> {
  props: P & {
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * Replace the default slots.
     */
    slots?: {
      root?: React.ElementType;
      asterisk?: React.ElementType;
    };
    /**
     * The props used for each slot inside the component.
     * @default {}
     */
    slotProps?: ComponentsProps;
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
