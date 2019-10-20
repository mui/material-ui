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

export interface PopupProps extends React.HTMLAttributes<HTMLElement> {
  anchorEl?: HTMLElement;
  open: boolean;
  popperRef: React.Ref<unknown>;
}

export type CreateFilterOptions = (
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
    'defaultValue' | 'onChange' | 'children'
  > {
  /**
   * If `true`, the portion of the selected suggestion that has not been typed by the user,
   * known as the completion string, appears inline after the input cursor in the textbox.
   * The inline completion string is visually highlighted and has a selected state.
   */
  autoComplete?: boolean;
  /**
   * If `true`, the first option is automatically highlighted.
   */
  autoHightlight?: boolean;
  /**
   * If `true`, the selected option becomes the value of the input
   * when the Autocomplete loses focus unless the user chooses
   * a different option or changes the character string in the input.
   */
  autoSelect?: boolean;
  /**
   * If `true`, clear all values when the user presses escape and the popup is closed.
   */
  clearOnEscape?: boolean;
  /**
   * If `true`, the popup will ignore the blur event if the input if filled.
   * You can inspect the popup markup with your browser tools.
   * Consider this option when you need to customize the component.
   */
  debug?: boolean;
  /**
   * The default input value. Use when the component is not controlled.
   */
  defaultValue?: any;
  /**
   * If `true`, the input can't be cleared.
   */
  disableClearable?: boolean;
  /**
   * If `true`, the popup won't close when a value is selected.
   */
  disableCloseOnSelect?: boolean;
  /**
   * If `true`, the list box in the popup will not wrap focus.
   */
  disableListWrap?: boolean;
  /**
   * If `true`, the popup won't open on input focus.
   */
  disableOpenOnFocus?: boolean;
  /**
   * A filter function that determins the options that are eligible.
   *
   * @param {any} options The options to render.
   * @param {object} state The state of the component.
   * @returns {boolean}
   */
  filterOptions?: (options: any[], state: FilterOptionsState) => any[];
  /**
   * If `true`, hide the selected options from the list box.
   */
  filterSelectedOptions?: boolean;
  /**
   * If `true`, the Autocomplete is free solo, meaning that the user input is not bound to provided options.
   */
  freeSolo?: boolean;
  /**
   * Used to determine the disabled state for a given option.
   */
  getOptionDisabled?: (option: any) => boolean;
  /**
   * Used to determine the string value for a given option.
   * It's used to fill the input (and the list box options if `renderOption` is not provided).
   */
  getOptionLabel?: (option: any) => string;
  /**
   * If provided, the options will be grouped under the returned string.
   * The groupBy value is also used as the text for group headings when `renderGroup` is not provided.
   *
   * @param {any} options The option to group.
   * @returns {string}
   */
  groupBy?: (option: any) => string;
  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id?: string;
  /**
   * If `true`, the highlight can move to the input.
   */
  includeInputInList?: boolean;
  /**
   * The component used to render the listbox.
   */
  ListboxComponent?: React.ComponentType<React.HTMLAttributes<HTMLElement>>;
  /**
   * If `true`, the component is in a loading state.
   */
  loading?: boolean;
  /**
   * Text to display when in a loading state.
   */
  loadingText?: React.ReactNode;
  /**
   * If true, `value` must be an array and the menu will support multiple selections.
   */
  multiple?: boolean;
  /**
   * Text to display when there are no options.
   */
  noOptionsText?: React.ReactNode;
  /**
   * Callback fired when the value changes.
   *
   * @param {object} event The event source of the callback
   * @param {any} value
   */
  onChange?: (event: React.ChangeEvent<{}>, value: any) => void;
  /**
   * Callback fired when the popup requests to be closed.
   * Use in controlled mode (see open).
   *
   * @param {object} event The event source of the callback.
   */
  onClose?: (event: React.ChangeEvent<{}>) => void;
  /**
   * Callback fired when the input value changes.
   */
  onInputChange?: React.ChangeEventHandler<HTMLInputElement>;
  /**
   * Callback fired when the popup requests to be opened.
   * Use in controlled mode (see open).
   *
   * @param {object} event The event source of the callback.
   */
  onOpen?: (event: React.ChangeEvent<{}>) => void;
  /**
   * Control the popup` open state.
   */
  open?: boolean;
  /**
   * Array of options.
   */
  options?: any[];
  /**
   * The component used to render the popup.
   */
  PopupComponent?: React.ComponentType<PopupProps>;
  /**
   * Render the group.
   *
   * @param {any} option The group to render.
   * @returns {ReactNode}
   */
  renderGroup?: (params: RenderGroupParams) => React.ReactNode;
  /**
   * Render the option, use `getOptionLabel` by default.
   *
   * @param {any} option The option to render.
   * @param {object} state The state of the component.
   * @returns {ReactNode}
   */
  renderOption?: (option: any, state: RenderOptionState) => React.ReactNode;
  /**
   * Render the selected value.
   *
   * @param {any} value The `value` provided to the component.
   * @returns {ReactNode}
   */
  renderValue?: (value: any, state: RenderValueState) => React.ReactNode;
  /**
   * Props applied to the [`TextField`](/api/text-field/) element.
   */
  TextFieldProps?: TextFieldProps;
  /**
   * The input value.
   */
  value?: any;
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

export default function Autocomplete(props: AutocompleteProps): JSX.Element;
