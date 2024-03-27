import * as React from 'react';
import type { FormControlState } from '../FormControl';
import type { UseTextboxParameters } from '../useTextbox';

type TextboxRootRenderFunction = (
  props: React.ComponentPropsWithRef<'div'>,
  ownerState: TextboxOwnerState,
) => React.ReactNode;

export type TextboxProps = Omit<UseTextboxParameters, 'error' | 'inputRef'> & {
  children?: React.ReactNode;
  /**
   * Class name applied to the root element.
   */
  className?: string;
  /**
   * If `true`, the `input` will indicate an error by setting the `aria-invalid` attribute on the input and the `baseui--error` class on the root element.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  error?: boolean;
  /**
   * The id of the `input` element.
   */
  id?: string;
  /**
   * Name attribute of the `input` element.
   */
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
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
   * If `true`, a `textarea` element is rendered.
   * @default false
   */
  render?: TextboxRootRenderFunction;
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
   * @default 'text'
   */
  type?: React.HTMLInputTypeAttribute;
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value?: unknown;
};

export type TextboxOwnerState = {
  disabled: boolean;
  error: boolean;
  focused: boolean;
  formControlContext: FormControlState | undefined;
  required: boolean;
  type: React.InputHTMLAttributes<HTMLInputElement>['type'] | undefined;
};
