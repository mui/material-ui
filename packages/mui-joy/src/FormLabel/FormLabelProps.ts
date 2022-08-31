import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { SlotComponentProps } from '@mui/base/utils';
import { SxProps } from '../styles/types';

export type FormLabelSlot = 'root' | 'asterisk';

interface ComponentsProps {
  root?: SlotComponentProps<'label', { sx?: SxProps }, FormLabelOwnerState>;
  asterisk?: SlotComponentProps<'span', { sx?: SxProps }, FormLabelOwnerState>;
}

export interface FormLabelTypeMap<P = {}, D extends React.ElementType = 'label'> {
  props: P & {
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * The props used for each slot inside the Input.
     * @default {}
     */
    componentsProps?: ComponentsProps;
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
