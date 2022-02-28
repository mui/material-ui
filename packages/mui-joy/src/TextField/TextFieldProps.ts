import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { FormHelperTextProps } from '../FormHelperText';
import { FormLabelProps } from '../FormLabel';
import { FormControlProps } from '../FormControl';
import { InputProps } from '../Input';

export interface TextFieldTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P &
    FormControlProps & {
      /**
       * This prop helps users to fill forms faster, especially on mobile devices.
       * The name can be confusing, as it's more like an autofill.
       * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
       */
      autoComplete?: string;
      /**
       * If `true`, the `input` element is focused during the first mount.
       * @default false
       */
      autoFocus?: boolean;
      /**
       * Props applied to the [`FormLabelProps`](/joy-ui/api/form-label/) element.
       */
      FormLabelProps?: Partial<FormLabelProps>;
      /**
       * Props applied to the [`FormHelperText`](/joy-ui/api/form-helper-text/) element.
       */
      FormHelperTextProps?: Partial<FormHelperTextProps>;
      /**
       * The id of the `input` element.
       * Use this prop to make `label` and `helperText` accessible for screen readers.
       */
      id?: string;
      /**
       * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
       */
      InputProps?: InputProps;
      /**
       * Pass a ref to the `input` element.
       */
      inputRef?: React.Ref<any>;
      /**
       * The label content.
       */
      label?: React.ReactNode;
      /**
       * Name attribute of the `input` element.
       */
      name?: string;
      onBlur?: React.FocusEventHandler<HTMLInputElement>;
      onFocus?: React.FocusEventHandler<HTMLInputElement>;
      /**
       * The short hint displayed in the `input` before the user enters a value.
       */
      placeholder?: string;
      /**
       * The helper text content.
       */
      helperText?: React.ReactNode;
      /**
       * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
       */
      type?: React.InputHTMLAttributes<unknown>['type'];
      /**
       * The value of the `input` element, required for a controlled component.
       */
      value?: unknown;
    };
  defaultComponent: D;
}

export type TextFieldProps<
  D extends React.ElementType = TextFieldTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<TextFieldTypeMap<P, D>, D>;
