import * as React from 'react';
import { SlotComponentProps } from '@mui/base';
import { FormControlContextValue } from '@mui/material-next/FormControl/FormControlContext';
import { UseInputRootSlotProps } from '@mui/base/useInput';
import { OverridableStringUnion, OverrideProps, Simplify } from '@mui/types';
import { SxProps } from '../styles';
import { InputBaseClasses } from './inputBaseClasses';

export interface InputBasePropsSizeOverrides {}
export interface InputBasePropsColorOverrides {}
export interface InputBaseRootSlotPropsOverrides {}
export interface InputBaseInputSlotPropsOverrides {}

export type InputBaseOwnProps = {
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
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<InputBaseClasses>;
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * The prop defaults to the value (`'primary'`) inherited from the parent FormControl component.
   */
  color?: OverridableStringUnion<
    'primary' | 'secondary' | 'tertiary' | 'error' | 'info' | 'success' | 'warning',
    InputBasePropsColorOverrides
  >;
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue?: unknown;
  /**
   * If `true`, the component is disabled.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  disabled?: boolean;
  /**
   * If `true`, GlobalStyles for the auto-fill keyframes will not be injected/removed on mount/unmount. Make sure to inject them at the top of your application.
   * This option is intended to help with boosting the initial rendering performance if you are loading a big amount of Input components at once.
   * @default false
   */
  disableInjectingGlobalStyles?: boolean;
  /**
   * End `InputAdornment` for this component.
   */
  endAdornment?: React.ReactNode;
  /**
   * If `true`, the `input` will indicate an error.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  error?: boolean;
  /**
   * If `true`, the `input` will take up the full width of its container.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * The id of the `input` element.
   */
  id?: string;
  /**
   * Pass a ref to the `input` element.
   */
  inputRef?: React.Ref<any>;
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   * The prop defaults to the value (`'none'`) inherited from the parent FormControl component.
   */
  margin?: 'dense' | 'none';
  /**
   * Name attribute of the `input` element.
   */
  name?: string;
  /**
   * Callback fired when the `input` is blurred.
   *
   * Notice that the first argument (event) might be undefined.
   */
  onBlur?: (event?: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  /**
   * Callback fired when the value is changed.
   *
   * @param {React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  /**
   * Callback fired when the `input` doesn't satisfy its constraints.
   */
  onInvalid?: React.FormEventHandler<HTMLInputElement | HTMLTextAreaElement>;
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
   * If `true`, the `input` element is required.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  required?: boolean;
  renderSuffix?: (state: {
    disabled?: boolean;
    error?: boolean;
    filled?: boolean;
    focused?: boolean;
    margin?: 'dense' | 'none' | 'normal';
    required?: boolean;
    startAdornment?: React.ReactNode;
  }) => React.ReactNode;
  /**
   * The size of the component.
   */
  size?: OverridableStringUnion<'small' | 'medium', InputBasePropsSizeOverrides>;
  /**
   * The props used for each slot inside the Input.
   * @default {}
   */
  slotProps?: {
    root?: SlotComponentProps<'div', InputBaseRootSlotPropsOverrides, InputBaseOwnerState> & {
      sx?: SxProps;
    };
    input?: SlotComponentProps<'input', InputBaseInputSlotPropsOverrides, InputBaseOwnerState> & {
      sx?: SxProps;
    };
  };
  /**
   * The components used for each slot inside the InputBase.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots?: InputBaseSlots;
  /**
   * Start `InputAdornment` for this component.
   */
  startAdornment?: React.ReactNode;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps;
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value?: unknown;
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
  multiline?: boolean;
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows?: number;
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
   * @default 'text'
   */
  type?: React.HTMLInputTypeAttribute;
};

export interface InputBaseSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType;
  /**
   * The component that renders the input.
   * @default 'input'
   */
  input?: React.ElementType;
  /**
   * The component that renders the textarea.
   * @default 'textarea'
   */
  textarea?: React.ElementType;
}

export interface InputBaseTypeMap<
  AdditionalProps = {},
  RootComponentType extends React.ElementType = 'div',
> {
  props: InputBaseOwnProps & AdditionalProps;
  defaultComponent: RootComponentType;
}

export type InputBaseProps<
  RootComponentType extends React.ElementType = InputBaseTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<InputBaseTypeMap<AdditionalProps, RootComponentType>, RootComponentType> & {
  inputComponent?: React.ElementType;
};

export type InputBaseOwnerState = Simplify<
  InputBaseOwnProps & {
    formControl: FormControlContextValue | undefined;
    hiddenLabel?: boolean;
    focused: boolean;
    type: React.InputHTMLAttributes<HTMLInputElement>['type'] | undefined;
  }
>;

export type InputBaseRootSlotProps = Simplify<
  UseInputRootSlotProps & {
    ownerState: InputBaseOwnerState;
    className?: string;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLDivElement>;
  }
>;

export type InputBaseInputSlotProps = Simplify<
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
    ownerState: InputBaseOwnerState;
    placeholder: string | undefined;
    readOnly: boolean | undefined;
    ref: React.Ref<HTMLInputElement>;
    type: React.HTMLInputTypeAttribute | undefined;
  }
>;
