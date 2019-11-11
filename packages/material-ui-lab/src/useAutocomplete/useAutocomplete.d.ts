import * as React from 'react';

export interface CreateFilterOptionsConfig {
  ignoreAccents?: boolean;
  ignoreCase?: boolean;
  matchFrom?: 'any' | 'start';
  stringify?: (option: any) => string;
  trim?: boolean;
}

export interface FilterOptionsState {
  inputValue: string;
}

export type CreateFilterOptions = (
  config: CreateFilterOptionsConfig,
) => (option: any, state: FilterOptionsState) => any[];

export const createFilterOptions: CreateFilterOptions;

export interface UseAutocompleteProps {
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
   * A filter function that determines the options that are eligible.
   *
   * @param {any[]} options The options to render.
   * @param {object} state The state of the component.
   * @returns {any[]}
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
   * The input value.
   */
  inputValue?: string;
  /**
   * If true, `value` must be an array and the menu will support multiple selections.
   */
  multiple?: boolean;
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
   *
   * @param {object} event The event source of the callback.
   * @param {string} value
   */
  onInputChange?: (event: React.ChangeEvent<{}>, value: any) => void;
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
   * The value of the autocomplete.
   */
  value?: any;
}

export default function useAutocomplete(
  props: UseAutocompleteProps,
): {
  getRootProps: () => {};
  getInputProps: () => {};
  getInputLabelProps: () => {};
  getClearProps: () => {};
  getPopupIndicatorProps: () => {};
  getTagProps: ({ index }: { index: number }) => {};
  getListboxProps: () => {};
  getOptionProps: ({ option, index }: { option: any; index: number }) => {};
  id: string;
  inputValue: string;
  value: any;
  dirty: boolean;
  popupOpen: boolean;
  focused: boolean;
  anchorEl: null | HTMLElement;
  setAnchorEl: () => void;
  focusedTag: number;
  groupedOptions: any[];
};
