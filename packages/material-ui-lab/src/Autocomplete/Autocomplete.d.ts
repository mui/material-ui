import * as React from 'react';
import { StandardProps } from '@material-ui/core';
import { InputProps as StandardInputProps } from '@material-ui/core/Input';
import { FilledInputProps } from '@material-ui/core/FilledInput';
import { OutlinedInputProps } from '@material-ui/core/OutlinedInput';
import { TextFieldProps } from '@material-ui/core/TextField';

export interface CreateFilterOptionsConfig {
  ignoreAccents?: boolean;
  ignoreCase?: boolean;
  matchFrom?: 'any' | 'start';
  stringify?: (option: any) => string;
  trim?: boolean;
}

type CreateFilterOptions = (
  config: CreateFilterOptionsConfig,
) => (option: any, state: FilterOptionsState) => any[];

export const createFilterOptions: CreateFilterOptions;

export interface FilterOptionsState {
  inputValue: string;
}

export interface RenderOptionState {
  inputValue: string;
  selected: boolean;
}

export interface RenderValueState {
  focused: boolean;
  className: string;
  onDelete: () => {};
}

export interface RenderGroupParams {
  key: string;
  children: React.ReactNode;
}

export interface AutocompleteProps
  extends StandardProps<
    React.HTMLAttributes<HTMLDivElement>,
    AutocompleteClassKey,
    'defaultValue' | 'onChange'
  > {
  autoComplete?: boolean;
  autoHightlight?: boolean;
  autoSelect?: boolean;
  clearOnEscape?: boolean;
  debug?: boolean;
  defaultValue?: unknown;
  disableClearable?: boolean;
  disableCloseOnSelect?: boolean;
  disableListWrap?: boolean;
  disableOpenOnFocus?: boolean;
  filterOptions?: (options: any[], state: FilterOptionsState) => any[];
  filterSelectedOptions?: boolean;
  freeSolo?: boolean;
  getOptionLabel?: (option: any) => string;
  groupBy?: (option: any) => string;
  id?: string;
  includeInputInList?: boolean;
  ListComponent?: React.ComponentType<React.HTMLAttributes<HTMLElement>>;
  loading?: boolean;
  loadingText?: React.ReactNode;
  multiple?: boolean;
  noOptionsText?: React.ReactNode;
  onChange?: (event: React.ChangeEvent<{}>, value: any) => void;
  onClose?: (event: React.ChangeEvent<{}>) => void;
  onInputChange?: React.ChangeEventHandler<HTMLInputElement>;
  onOpen?: (event: React.ChangeEvent<{}>) => void;
  open?: boolean;
  options?: any[];
  renderGroup?: (params: RenderGroupParams) => React.ReactNode;
  renderOption?: (option: any, state: RenderOptionState) => React.ReactNode;
  renderValue?: (value: any, state: RenderValueState) => React.ReactNode;
  TextFieldProps?: TextFieldProps;
  value?: unknown;
}

export type AutocompleteClassKey =
  | 'root'
  | 'focused'
  | 'chip'
  | 'chipFocused'
  | 'inputRoot'
  | 'inputInput'
  | 'inputInputFocused'
  | 'clearIndicator'
  | 'clearIndicatorDirty'
  | 'popupIndicator'
  | 'popupIndicatorOpen'
  | 'popper'
  | 'paper'
  | 'option'
  | 'selected'
  | 'loading'
  | 'noOptions';

declare const Autocomplete: React.ComponentType<AutocompleteProps>;

export default Autocomplete;
