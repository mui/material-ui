import * as React from 'react';
import type { Simplify } from '@mui/types';
import type { FormControlState } from '../FormControl';
import type { UseInputRootSlotProps } from '../useInput';
import { UseInputRootParameters } from '../useInput/useInputRoot';

type InputRootRenderFunction = (
  props: React.ComponentPropsWithRef<'div'>,
  ownerState: InputOwnerState,
) => React.ReactNode;

export type InputProps = Omit<UseInputRootParameters, 'error' | 'inputRef'> & {
  children?: React.ReactNode;
  /**
   * Class name applied to the root element.
   */
  className?: string;
  /**
   * Trailing adornment for this input.
   */
  endAdornment?: React.ReactNode;
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
  render?: InputRootRenderFunction;
  /**
   * Leading adornment for this input.
   */
  startAdornment?: React.ReactNode;
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

export type InputOwnerState = {
  disabled: boolean;
  error: boolean;
  focused: boolean;
  formControlContext: FormControlState | undefined;
  required: boolean;
  type: React.InputHTMLAttributes<HTMLInputElement>['type'] | undefined;
};

export type InputRootSlotProps = Simplify<
  UseInputRootSlotProps & {
    ownerState: InputOwnerState;
    className?: string;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLDivElement>;
  }
>;

export type InputInputSlotProps = Simplify<
  Omit<UseInputRootSlotProps, 'onClick'> & {
    'aria-describedby': React.AriaAttributes['aria-describedby'];
    'aria-label': React.AriaAttributes['aria-label'];
    'aria-labelledby': React.AriaAttributes['aria-labelledby'];
    autoComplete: string | undefined;
    autoFocus: boolean | undefined;
    className?: string;
    id: string | undefined;
    name: string | undefined;
    onKeyDown: React.KeyboardEventHandler<HTMLInputElement> | undefined;
    onKeyUp: React.KeyboardEventHandler<HTMLInputElement> | undefined;
    ownerState: InputOwnerState;
    placeholder: string | undefined;
    readOnly: boolean | undefined;
    ref: React.Ref<HTMLInputElement>;
    type: React.HTMLInputTypeAttribute | undefined;
  }
>;
