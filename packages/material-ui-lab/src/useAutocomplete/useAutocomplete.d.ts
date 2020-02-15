import * as React from 'react';

export interface CreateFilterOptionsConfig<T> {
  ignoreAccents?: boolean;
  ignoreCase?: boolean;
  matchFrom?: 'any' | 'start';
  stringify?: (option: T) => string;
  trim?: boolean;
  limit?: number;
}

export interface FilterOptionsState {
  inputValue: string;
}

export function createFilterOptions<T>(
  config?: CreateFilterOptionsConfig<T>,
): (options: T[], state: FilterOptionsState) => T[];

export interface UseAutocompleteCommonProps<T> {
  /**
   * If `true`, the portion of the selected suggestion that has not been typed by the user,
   * known as the completion string, appears inline after the input cursor in the textbox.
   * The inline completion string is visually highlighted and has a selected state.
   */
  autoComplete?: boolean;
  /**
   * If `true`, the first option is automatically highlighted.
   */
  autoHighlight?: boolean;
  /**
   * If `true`, the selected option becomes the value of the input
   * when the Autocomplete loses focus unless the user chooses
   * a different option or changes the character string in the input.
   */
  autoSelect?: boolean;
  /**
   * Control if the input should be blurred when an option is selected:
   *
   * - `false` the input is not blurred.
   * - `true` the input is always blurred.
   * - `touch` the input is blurred after a touch event.
   * - `mouse` the input is blurred after a mouse event.
   */
  blurOnSelect?: 'touch' | 'mouse' | true | false;
  /**
   * If `true`, clear all values when the user presses escape and the popup is closed.
   */
  clearOnEscape?: boolean;
  /**
   * The component name that is using this hook. Used for warnings.
   */
  componentName?: string;
  /**
   * If `true`, the popup will ignore the blur event if the input if filled.
   * You can inspect the popup markup with your browser tools.
   * Consider this option when you need to customize the component.
   */
  debug?: boolean;
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
   * A filter function that determines the options that are eligible.
   *
   * @param {T[]} options The options to render.
   * @param {object} state The state of the component.
   * @returns {T[]}
   */
  filterOptions?: (options: T[], state: FilterOptionsState) => T[];
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
  getOptionDisabled?: (option: T) => boolean;
  /**
   * Used to determine the string value for a given option.
   * It's used to fill the input (and the list box options if `renderOption` is not provided).
   */
  getOptionLabel?: (option: T) => string;
  /**
   * Used to determine if an option is selected.
   * Uses strict equality by default.
   */
  getOptionSelected?: (option: T, value: T) => boolean;
  /**
   * If provided, the options will be grouped under the returned string.
   * The groupBy value is also used as the text for group headings when `renderGroup` is not provided.
   *
   * @param {T} options The option to group.
   * @returns {string}
   */
  groupBy?: (option: T) => string;
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
   * The input value.
   */
  inputValue?: string;
  /**
   * Callback fired when the popup requests to be closed.
   * Use in controlled mode (see open).
   *
   * @param {object} event The event source of the callback.
   */
  onClose?: (event: React.ChangeEvent<{}>) => void;
  /**
   * Callback fired when the input value changes.
   *
   * @param {object} event The event source of the callback.
   * @param {string} value The new value of the text input.
   * @param {string} reason Can be: `"input"` (user input), `"reset"` (programmatic change), `"clear"`.
   */
  onInputChange?: (
    event: React.ChangeEvent<{}>,
    value: string,
    reason: 'input' | 'reset' | 'clear',
  ) => void;
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
  options: T[];
  /**
   * If `true`, the input's text will be selected on focus.
   * It helps the user clearning the selected value.
   */
  selectOnFocus?: boolean;
}

export interface UseAutocompleteMultipleProps<T> extends UseAutocompleteCommonProps<T> {
  /**
   * If `true`, `value` must be an array and the menu will support multiple selections.
   */
  multiple: true;
  /**
   * The value of the autocomplete.
   *
   * The value must have reference equality with the option in order to be selected.
   * You can customize the equality behavior with the `getOptionSelected` prop.
   */
  value?: T[];
  /**
   * The default input value. Use when the component is not controlled.
   */
  defaultValue?: T[];
  /**
   * Callback fired when the value changes.
   *
   * @param {object} event The event source of the callback.
   * @param {T[]} value
   */
  onChange?: (event: React.ChangeEvent<{}>, value: T[]) => void;
}

export interface UseAutocompleteSingleProps<T> extends UseAutocompleteCommonProps<T> {
  /**
   * If `true`, `value` must be an array and the menu will support multiple selections.
   */
  multiple?: false;
  /**
   * The value of the autocomplete.
   *
   * The value must have reference equality with the option in order to be selected.
   * You can customize the equality behavior with the `getOptionSelected` prop.
   */
  value?: T | null;
  /**
   * The default input value. Use when the component is not controlled.
   */
  defaultValue?: T;
  /**
   * Callback fired when the value changes.
   *
   * @param {object} event The event source of the callback.
   * @param {T} value
   */
  onChange?: (event: React.ChangeEvent<{}>, value: T | null) => void;
}

export type UseAutocompleteProps<T> =
  | UseAutocompleteSingleProps<T>
  | UseAutocompleteMultipleProps<T>;

export default function useAutocomplete<T>(
  props: UseAutocompleteProps<T>,
): {
  getRootProps: () => {};
  getInputProps: () => {};
  getInputLabelProps: () => {};
  getClearProps: () => {};
  getPopupIndicatorProps: () => {};
  getTagProps: ({ index }: { index: number }) => {};
  getListboxProps: () => {};
  getOptionProps: ({ option, index }: { option: T; index: number }) => {};
  id: string;
  inputValue: string;
  // TODO: infer the right type when the issue is resolved
  // https://github.com/microsoft/TypeScript/issues/13995
  value: any; // or T | T[]
  dirty: boolean;
  popupOpen: boolean;
  focused: boolean;
  anchorEl: null | HTMLElement;
  setAnchorEl: () => void;
  focusedTag: number;
  groupedOptions: T[];
};
