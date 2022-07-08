import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { FormHelperTextProps } from '../FormHelperText/FormHelperTextProps';
import { FormLabelProps } from '../FormLabel/FormLabelProps';
import { InputProps } from '../Input/InputProps';

export type TextFieldSlot = 'root';

type InputRootKeys =
  | 'autoComplete'
  | 'autoFocus'
  | 'disabled'
  | 'error'
  | 'required'
  | 'fullWidth'
  | 'placeholder'
  | 'defaultValue'
  | 'value'
  | 'onChange'
  | 'onFocus'
  | 'onBlur'
  | 'type'
  | 'variant'
  | 'color'
  | 'size'
  | 'startDecorator'
  | 'endDecorator'
  | 'sx';

export interface TextFieldTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P &
    Pick<InputProps, InputRootKeys> & {
      components?: {
        Root?: React.ElementType;
        Label?: React.ElementType;
        Input?: React.ElementType;
        HelperText?: React.ElementType;
      };
      componentsProps?: {
        root?: React.ComponentPropsWithRef<'div'>;
        label?: FormLabelProps;
        input?: Omit<InputProps, InputRootKeys>;
        helperText?: FormHelperTextProps;
      };
      /**
       * The id of the `input` element.
       * Use this prop to make `label` and `helperText` accessible for screen readers.
       */
      id?: string;
      /**
       * The label content.
       */
      label?: React.ReactNode;
      /**
       * Name attribute of the `input` element.
       */
      name?: string;
      /**
       * The short hint displayed in the `input` before the user enters a value.
       */
      placeholder?: string;
      /**
       * The helper text content.
       */
      helperText?: React.ReactNode;
    };
  defaultComponent: D;
}

export type TextFieldProps<
  D extends React.ElementType = TextFieldTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<TextFieldTypeMap<P, D>, D>;
