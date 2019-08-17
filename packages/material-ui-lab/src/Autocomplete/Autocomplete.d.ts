import * as React from 'react';
import { StandardProps } from '@material-ui/core';
import { BaseTextFieldProps } from '@material-ui/core/TextField';
import { InputProps as StandardInputProps } from '@material-ui/core/Input';
import { FilledInputProps } from '@material-ui/core/FilledInput';
import { OutlinedInputProps } from '@material-ui/core/OutlinedInput';

interface RenderProps {
  ref: React.Ref<HTMLElement>;
  onChange: React.ChangeEvent<HTMLInputElement>;
  onFocus: React.FocusEvent<HTMLInputElement>;
  onKeyDown: React.KeyboardEvent<HTMLInputElement>;
}

export interface AutocompleteProps
  extends StandardProps<
    BaseTextFieldProps,
    AutocompleteClassKey,
    'autoComplete' | 'select' | 'SelectProps' | 'inputRef'
  > {
  children?: (props: RenderProps) => React.ReactNode;
  getSuggestions: (value: string) => any[];
  getSuggestionValue: (suggestion: any) => string;
  InputProps?: Partial<StandardInputProps | FilledInputProps | OutlinedInputProps>;
  inputProps?:
    | StandardInputProps['inputProps']
    | FilledInputProps['inputProps']
    | OutlinedInputProps['inputProps'];
  onSuggestionSelect: (value: string) => void;
  variant?: 'standard' | 'filled' | 'outlined';
}

export type AutocompleteClassKey = 'root' | 'paper' | 'menuItem' | 'popper';

declare const Autocomplete: React.ComponentType<AutocompleteProps>;

export default Autocomplete;
