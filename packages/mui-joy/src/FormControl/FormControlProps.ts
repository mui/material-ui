import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { InputProps } from '../Input/InputProps';
import { SxProps } from '../styles/types';

export type FormControlSlot = 'root';

export interface FormControlPropsColorOverrides {}
export interface FormControlPropsVariantOverrides {}

type InputRootKeys = 'disabled' | 'error' | 'required' | 'variant' | 'color' | 'size';

export interface FormControlTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P &
    Pick<InputProps, InputRootKeys> & {
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

export type FormControlProps<
  D extends React.ElementType = FormControlTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<FormControlTypeMap<P, D>, D>;

export interface FormControlOwnerState extends FormControlProps {}
