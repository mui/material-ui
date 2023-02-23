import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { SxProps } from '../styles/types';

export type FormHelperTextSlot = 'root';

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
  };
  defaultComponent: D;
}

export type FormHelperTextProps<
  D extends React.ElementType = FormHelperTextTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<FormHelperTextTypeMap<P, D>, D>;

export interface FormHelperTextOwnerState extends FormHelperTextProps {}
