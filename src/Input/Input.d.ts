import * as React from 'react';
import { StyledComponent } from '..';

export type InputProps = {
  autoComplete?: string;
  autoFocus?: boolean;
  component?: React.ReactNode;
  defaultValue?: string | number;
  disabled?: boolean;
  disableUnderline?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  id?: string;
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
  type?: string;
  value?: string | number;
  onClean?: () => void;
  onDirty?: () => void;
} & React.HTMLAttributes<HTMLDivElement>;

export default class Input extends StyledComponent<InputProps> {}
