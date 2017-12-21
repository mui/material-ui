import * as React from 'react';
import { StandardProps } from '..';

export interface InputProps extends StandardProps<
  React.HTMLAttributes<HTMLDivElement>,
  InputClassKey,
  'onChange' | 'onKeyUp' | 'onKeyDown' | 'defaultValue'
> {
  autoComplete?: string;
  autoFocus?: boolean;
  defaultValue?: string | number;
  disabled?: boolean;
  disableUnderline?: boolean;
  endAdornment?: React.ReactNode;
  error?: boolean;
  fullWidth?: boolean;
  id?: string;
  inputComponent?: string | React.ComponentType<InputProps>;
  inputProps?:
    | React.TextareaHTMLAttributes<HTMLTextAreaElement>
    | React.InputHTMLAttributes<HTMLInputElement>;
  inputRef?: React.Ref<any>;
  margin?: 'dense';
  multiline?: boolean;
  name?: string;
  placeholder?: string;
  rows?: string | number;
  rowsMax?: string | number;
  startAdornment?: React.ReactNode;
  type?: string;
  value?: Array<string | number> | string | number;
  onClean?: () => void;
  onDirty?: () => void;
  /**
   * `onChange`, `onKeyUp` + `onKeyDown` are applied to the inner `InputComponent`,
   * which by default is an input or textarea. Since these handlers differ from the
   * ones inherited by `React.HTMLAttributes<HTMLDivElement>` we need to omit them.
   *
   * Note that  `blur` and `focus` event handler are applied to the outter `<div>`.
   * So these can just be inherited from the native `<div>`.
   */
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onKeyUp?: React.KeyboardEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}

export type InputClassKey =
  | 'root'
  | 'formControl'
  | 'inkbar'
  | 'error'
  | 'input'
  | 'inputDense'
  | 'disabled'
  | 'focused'
  | 'underline'
  | 'multiline'
  | 'inputDisabled'
  | 'inputSingleline'
  | 'inputSearch'
  | 'inputMultiline'
  | 'fullWidth'
  ;

declare const Input: React.ComponentType<InputProps>;

export default Input;
