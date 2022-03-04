import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { FormHelperTextProps } from '../FormHelperText';
import { FormLabelProps } from '../FormLabel';
import { InputProps } from '../Input';

export interface TextFieldTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P &
    Pick<
      InputProps,
      | 'autoComplete'
      | 'autoFocus'
      | 'disabled'
      | 'error'
      | 'required'
      | 'fullWidth'
      | 'inputRef'
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
      | 'startAdornment'
      | 'endAdornment'
    > & {
      components?: {
        Root?: React.ElementType;
        Label?: React.ElementType;
        HelperText?: React.ElementType;
        InputRoot?: React.ElementType;
        InputInput?: React.ElementType;
      };
      componentsProps?: {
        root?: React.ComponentPropsWithRef<'div'>;
        label?: FormLabelProps;
        helperText?: FormHelperTextProps;
        inputRoot?: React.ComponentPropsWithRef<'div'>;
        inputInput?: React.ComponentPropsWithRef<'input'>;
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
