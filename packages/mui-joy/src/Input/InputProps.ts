import React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { UseInputProps } from '@mui/core/InputUnstyled';
import { InputClasses } from './inputClasses';

export interface InputPropsSizeOverrides {}

export interface InputTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P &
    UseInputProps & {
      'aria-describedby'?: string;
      'aria-label'?: string;
      'aria-labelledby'?: string;
      /**
       * This prop helps users to fill forms faster, especially on mobile devices.
       * The name can be confusing, as it's more like an autofill.
       * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
       */
      autoComplete?: string;
      /**
       * If `true`, the `input` element is focused during the first mount.
       */
      autoFocus?: boolean;
      /**
       * Class name applied to the root element.
       */
      className?: string;
      /**
       * Override or extend the styles applied to the component.
       */
      classes?: Partial<InputClasses>;
      /**
       * The component used for the Root slot.
       * Either a string to use a HTML element or a component.
       * This is equivalent to `components.Root`. If both are provided, the `component` is used.
       */
      component?: D | React.ElementType;
      /**
       * Trailing adornment for this input.
       */
      endAdornment?: React.ReactNode;
      /**
       * The id of the `input` element.
       */
      id?: string;
      /**
       * Pass a ref to the `input` element.
       */
      inputRef?: React.Ref<any>;
      /**
       * Name attribute of the `input` element.
       */
      name?: string;
      onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
      onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
      /**
       * The short hint displayed in the `input` before the user enters a value.
       */
      placeholder?: string;
      /**
       * It prevents the user from changing the value of the field
       * (not from interacting with the field).
       */
      readOnly?: boolean;
      /**
       * Leading adornment for this input.
       */
      startAdornment?: React.ReactNode;
      /**
       * The size of the component.
       */
      size?: OverridableStringUnion<'small' | 'large', InputPropsSizeOverrides>;
      /**
       * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
       * @default 'text'
       */
      type?: string;
      /**
       * The value of the `input` element, required for a controlled component.
       */
      value?: unknown;
    };
  defaultComponent: D;
}

export type InputProps<
  D extends React.ElementType = InputTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<InputTypeMap<P, D>, D>;

export default InputProps;
