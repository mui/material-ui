import React from 'react';
import { FormControlUnstyledState } from '../FormControlUnstyled/FormControlContext';
import { InputProps } from './useInput';

export interface InputOwnerState
  extends Omit<InputUnstyledProps, 'component' | 'components' | 'componentsProps'> {
  formControl: FormControlUnstyledState;
  focused: boolean;
}

export interface InputUnstyledProps extends InputProps {
  'aria-describedby'?: string;
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
  className?: string;
  component?: React.ElementType;
  /**
   * The components used for each slot inside the InputBase.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components?: {
    Root?: React.ElementType;
    Input?: React.ElementType;
    Textarea?: React.ElementType;
  };
  /**
   * The props used for each slot inside the Input.
   * @default {}
   */
  componentsProps?: {
    root?: React.HTMLAttributes<HTMLDivElement> & { ownerState: InputOwnerState };
    input?: React.HTMLAttributes<HTMLInputElement> & { ownerState: InputOwnerState };
  };
  /**
   * The id of the `input` element.
   */
  id?: string;
  /**
   * If `true`, a `textarea` element is rendered.
   * @default false
   */
  multiline: boolean;
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
   * Number of rows to display when multiline option is set to true.
   */
  rows?: number;
  /**
   * Minimum number of rows to display when multiline option is set to true.
   */
  minRows?: number;
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  maxRows?: number;
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
   * @default 'text'
   */
  type?: string;
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value?: unknown;
}
