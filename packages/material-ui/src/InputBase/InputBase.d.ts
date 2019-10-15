import * as React from 'react';
import { StandardProps } from '..';

export interface InputBaseProps
  extends StandardProps<
    React.HTMLAttributes<HTMLDivElement>,
    InputBaseClassKey,
    'onChange' | 'onKeyUp' | 'onKeyDown' | 'onBlur' | 'onFocus' | 'defaultValue'
  > {
  autoComplete?: string;
  autoFocus?: boolean;
  color?: 'primary' | 'secondary';
  defaultValue?: unknown;
  disabled?: boolean;
  endAdornment?: React.ReactNode;
  error?: boolean;
  fullWidth?: boolean;
  id?: string;
  inputComponent?: React.ElementType<InputBaseComponentProps>;
  inputProps?: InputBaseComponentProps;
  inputRef?: React.Ref<any>;
  margin?: 'dense' | 'none';
  multiline?: boolean;
  name?: string;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  renderPrefix?: (state: {
    disabled?: boolean;
    error?: boolean;
    filled?: boolean;
    focused?: boolean;
    margin?: 'dense' | 'none' | 'normal';
    required?: boolean;
    startAdornment?: React.ReactNode;
  }) => React.ReactNode;
  rows?: string | number;
  rowsMax?: string | number;
  startAdornment?: React.ReactNode;
  type?: string;
  value?: unknown;
  /**
   * `onChange`, `onKeyUp`, `onKeyDown`, `onBlur`, `onFocus` are applied to the inner `InputComponent`,
   * which by default is an input or textarea. Since these handlers differ from the
   * ones inherited by `React.HTMLAttributes<HTMLDivElement>` we need to omit them.
   */
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onKeyUp?: React.KeyboardEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

export interface InputBaseComponentProps
  extends React.HTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  // Accommodate arbitrary additional props coming from the `inputProps` prop
  [arbitrary: string]: any;
}

export type InputBaseClassKey =
  | 'root'
  | 'formControl'
  | 'focused'
  | 'disabled'
  | 'adornedEnd'
  | 'adornedStart'
  | 'error'
  | 'marginDense'
  | 'multiline'
  | 'fullWidth'
  | 'colorSecondary'
  | 'input'
  | 'inputMarginDense'
  | 'inputMultiline'
  | 'inputTypeSearch'
  | 'inputAdornedStart'
  | 'inputAdornedEnd'
  | 'inputHiddenLabel';

declare const InputBase: React.ComponentType<InputBaseProps>;

export default InputBase;
