import React from 'react';
import { OverrideProps, Simplify } from '@mui/types';
import { UseInputParameters, UseInputRootSlotProps } from '@mui/base/useInput';
import { FormControlUnstyledState } from '../FormControlUnstyled';
import { SlotComponentProps } from '../utils';

export interface InputUnstyledComponentsPropsOverrides {}

export interface SingleLineInputUnstyledProps {
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  maxRows?: undefined;
  /**
   * Minimum number of rows to display when multiline option is set to true.
   */
  minRows?: undefined;
  /**
   * If `true`, a `textarea` element is rendered.
   * @default false
   */
  multiline?: false;
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows?: undefined;
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
   * @default 'text'
   */
  type?: React.HTMLInputTypeAttribute;
}

export interface MultiLineInputUnstyledProps {
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  maxRows?: number;
  /**
   * Minimum number of rows to display when multiline option is set to true.
   */
  minRows?: number;
  /**
   * If `true`, a `textarea` element is rendered.
   * @default false
   */
  multiline: true;
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows?: number;
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
   * @default 'text'
   */
  type?: undefined;
}

export type InputUnstyledOwnProps = (SingleLineInputUnstyledProps | MultiLineInputUnstyledProps) &
  UseInputParameters & {
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
      root?: SlotComponentProps<
        'div',
        InputUnstyledComponentsPropsOverrides,
        InputUnstyledOwnerState
      >;
      input?: SlotComponentProps<
        'input',
        InputUnstyledComponentsPropsOverrides,
        InputUnstyledOwnerState
      >;
    };
    /**
     * Trailing adornment for this input.
     */
    endAdornment?: React.ReactNode;
    /**
     * The id of the `input` element.
     */
    id?: string;
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
     * The value of the `input` element, required for a controlled component.
     */
    value?: unknown;
  };

export interface InputUnstyledTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & InputUnstyledOwnProps;
  defaultComponent: D;
}

export type InputUnstyledProps<
  D extends React.ElementType = InputUnstyledTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<InputUnstyledTypeMap<P, D>, D> & {
  component?: D;
};

export type InputUnstyledOwnerState = Simplify<
  Omit<InputUnstyledProps, 'component' | 'components' | 'componentsProps'> & {
    formControlContext: FormControlUnstyledState | undefined;
    focused: boolean;
    type: React.InputHTMLAttributes<HTMLInputElement>['type'] | undefined;
  }
>;

export type InputUnstyledRootSlotProps = Simplify<
  UseInputRootSlotProps & {
    ownerState: InputUnstyledOwnerState;
    className?: string;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLDivElement>;
  }
>;

export type InputUnstyledInputSlotProps = Simplify<
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
    ownerState: InputUnstyledOwnerState;
    placeholder: string | undefined;
    readOnly: boolean | undefined;
    ref: React.Ref<HTMLInputElement>;
    type: React.HTMLInputTypeAttribute | undefined;
  }
>;
