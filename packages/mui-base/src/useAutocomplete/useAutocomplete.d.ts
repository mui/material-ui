import * as React from 'react';

export interface CreateFilterOptionsConfig<Value> {
  ignoreAccents?: boolean;
  ignoreCase?: boolean;
  limit?: number;
  matchFrom?: 'any' | 'start';
  stringify?: (option: Value) => string;
  trim?: boolean;
}

export interface FilterOptionsState<Value> {
  inputValue: string;
  getOptionLabel: (option: Value) => string;
}

export interface AutocompleteGroupedOption<Value = string> {
  key: number;
  index: number;
  group: string;
  options: Value[];
}

export function createFilterOptions<Value>(
  config?: CreateFilterOptionsConfig<Value>,
): (options: Value[], state: FilterOptionsState<Value>) => Value[];

export type AutocompleteFreeSoloValueMapping<FreeSolo> = FreeSolo extends true ? string : never;

export type AutocompleteValue<Value, Multiple, DisableClearable, FreeSolo> = Multiple extends true
  ? ReadonlyArray<Value | AutocompleteFreeSoloValueMapping<FreeSolo>>
  : DisableClearable extends true
  ? NonNullable<Value | AutocompleteFreeSoloValueMapping<FreeSolo>>
  : Value | null | AutocompleteFreeSoloValueMapping<FreeSolo>;

export interface UseAutocompleteProps<
  Value,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
> {
  /**
   * @internal The prefix of the state class name, temporary for Joy UI
   * @default 'Mui'
   */
  unstable_classNamePrefix?: string;
  /**
   * @internal
   * Temporary for Joy UI because the parent listbox is the document object
   * TODO v6: Normalize the logic and remove this param.
   */
  unstable_isActiveElementInListbox?: (listbox: React.RefObject<HTMLElement>) => boolean;
  /**
   * If `true`, the portion of the selected suggestion that has not been typed by the user,
   * known as the completion string, appears inline after the input cursor in the textbox.
   * The inline completion string is visually highlighted and has a selected state.
   * @default false
   */
  autoComplete?: boolean;
  /**
   * If `true`, the first option is automatically highlighted.
   * @default false
   */
  autoHighlight?: boolean;
  /**
   * If `true`, the selected option becomes the value of the input
   * when the Autocomplete loses focus unless the user chooses
   * a different option or changes the character string in the input.
   *
   * When using `freeSolo` mode, the typed value will be the input value
   * if the Autocomplete loses focus without highlighting an option.
   * @default false
   */
  autoSelect?: boolean;
  /**
   * Control if the input should be blurred when an option is selected:
   *
   * - `false` the input is not blurred.
   * - `true` the input is always blurred.
   * - `touch` the input is blurred after a touch event.
   * - `mouse` the input is blurred after a mouse event.
   * @default false
   */
  blurOnSelect?: 'touch' | 'mouse' | true | false;
  /**
   * If `true`, the input's text is cleared on blur if no value is selected.
   *
   * Set to `true` if you want to help the user enter a new value.
   * Set to `false` if you want to help the user resume their search.
   * @default !props.freeSolo
   */
  clearOnBlur?: boolean;
  /**
   * If `true`, clear all values when the user presses escape and the popup is closed.
   * @default false
   */
  clearOnEscape?: boolean;
  /**
   * The component name that is using this hook. Used for warnings.
   */
  componentName?: string;
  /**
   * The default value. Use when the component is not controlled.
   * @default props.multiple ? [] : null
   */
  defaultValue?: AutocompleteValue<Value, Multiple, DisableClearable, FreeSolo>;
  /**
   * If `true`, the input can't be cleared.
   * @default false
   */
  disableClearable?: DisableClearable;
  /**
   * If `true`, the popup won't close when a value is selected.
   * @default false
   */
  disableCloseOnSelect?: boolean;
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * If `true`, will allow focus on disabled items.
   * @default false
   */
  disabledItemsFocusable?: boolean;
  /**
   * If `true`, the list box in the popup will not wrap focus.
   * @default false
   */
  disableListWrap?: boolean;
  /**
   * A function that determines the filtered options to be rendered on search.
   *
   * @default createFilterOptions()
   * @param {Value[]} options The options to render.
   * @param {object} state The state of the component.
   * @returns {Value[]}
   */
  filterOptions?: (options: Value[], state: FilterOptionsState<Value>) => Value[];
  /**
   * If `true`, hide the selected options from the list box.
   * @default false
   */
  filterSelectedOptions?: boolean;
  /**
   * If `true`, the Autocomplete is free solo, meaning that the user input is not bound to provided options.
   * @default false
   */
  freeSolo?: FreeSolo;
  /**
   * Used to determine the disabled state for a given option.
   *
   * @param {Value} option The option to test.
   * @returns {boolean}
   */
  getOptionDisabled?: (option: Value) => boolean;
  /**
   * Used to determine the string value for a given option.
   * It's used to fill the input (and the list box options if `renderOption` is not provided).
   *
   * If used in free solo mode, it must accept both the type of the options and a string.
   *
   * @param {Value} option
   * @returns {string}
   * @default (option) => option.label ?? option
   */
  getOptionLabel?: (option: Value | AutocompleteFreeSoloValueMapping<FreeSolo>) => string;
  /**
   * If provided, the options will be grouped under the returned string.
   * The groupBy value is also used as the text for group headings when `renderGroup` is not provided.
   *
   * @param {Value} options The options to group.
   * @returns {string}
   */
  groupBy?: (option: Value) => string;

  /**
   * If `true`, the component handles the "Home" and "End" keys when the popup is open.
   * It should move focus to the first option and last option, respectively.
   * @default !props.freeSolo
   */
  handleHomeEndKeys?: boolean;
  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide an id it will fall back to a randomly generated one.
   */
  id?: string;
  /**
   * If `true`, the highlight can move to the input.
   * @default false
   */
  includeInputInList?: boolean;
  /**
   * The input value.
   */
  inputValue?: string;
  /**
   * Used to determine if the option represents the given value.
   * Uses strict equality by default.
   * ⚠️ Both arguments need to be handled, an option can only match with one value.
   *
   * @param {Value} option The option to test.
   * @param {Value} value The value to test against.
   * @returns {boolean}
   */
  isOptionEqualToValue?: (option: Value, value: Value) => boolean;
  /**
   * If `true`, `value` must be an array and the menu will support multiple selections.
   * @default false
   */
  multiple?: Multiple;
  /**
   * Callback fired when the value changes.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   * @param {Value|Value[]} value The new value of the component.
   * @param {string} reason One of "createOption", "selectOption", "removeOption", "blur" or "clear".
   * @param {string} [details]
   */
  onChange?: (
    event: React.SyntheticEvent,
    value: AutocompleteValue<Value, Multiple, DisableClearable, FreeSolo>,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<Value>,
  ) => void;
  /**
   * Callback fired when the popup requests to be closed.
   * Use in controlled mode (see open).
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   * @param {string} reason Can be: `"toggleInput"`, `"escape"`, `"selectOption"`, `"removeOption"`, `"blur"`.
   */
  onClose?: (event: React.SyntheticEvent, reason: AutocompleteCloseReason) => void;
  /**
   * Callback fired when the highlight option changes.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   * @param {Value} option The highlighted option.
   * @param {string} reason Can be: `"keyboard"`, `"auto"`, `"mouse"`, `"touch"`.
   */
  onHighlightChange?: (
    event: React.SyntheticEvent,
    option: Value | null,
    reason: AutocompleteHighlightChangeReason,
  ) => void;
  /**
   * Callback fired when the input value changes.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   * @param {string} value The new value of the text input.
   * @param {string} reason Can be: `"input"` (user input), `"reset"` (programmatic change), `"clear"`.
   */
  onInputChange?: (
    event: React.SyntheticEvent,
    value: string,
    reason: AutocompleteInputChangeReason,
  ) => void;
  /**
   * Callback fired when the popup requests to be opened.
   * Use in controlled mode (see open).
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onOpen?: (event: React.SyntheticEvent) => void;
  /**
   * If `true`, the component is shown.
   */
  open?: boolean;
  /**
   * If `true`, the popup will open on input focus.
   * @default false
   */
  openOnFocus?: boolean;
  /**
   * Array of options.
   */
  options: ReadonlyArray<Value>;
  /**
   * If `true`, the component becomes readonly. It is also supported for multiple tags where the tag cannot be deleted.
   * @default false
   */
  readOnly?: boolean;
  /**
   * If `true`, the input's text is selected on focus.
   * It helps the user clear the selected value.
   * @default !props.freeSolo
   */
  selectOnFocus?: boolean;
  /**
   * The value of the autocomplete.
   *
   * The value must have reference equality with the option in order to be selected.
   * You can customize the equality behavior with the `isOptionEqualToValue` prop.
   */
  value?: AutocompleteValue<Value, Multiple, DisableClearable, FreeSolo>;
}

export interface UseAutocompleteParameters<
  Value,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
> extends UseAutocompleteProps<Value, Multiple, DisableClearable, FreeSolo> {}

export type AutocompleteHighlightChangeReason = 'keyboard' | 'mouse' | 'auto' | 'touch';

export type AutocompleteChangeReason =
  | 'createOption'
  | 'selectOption'
  | 'removeOption'
  | 'clear'
  | 'blur';
export interface AutocompleteChangeDetails<Value = string> {
  option: Value;
}
export type AutocompleteCloseReason =
  | 'createOption'
  | 'toggleInput'
  | 'escape'
  | 'selectOption'
  | 'removeOption'
  | 'blur';
export type AutocompleteInputChangeReason = 'input' | 'reset' | 'clear';

export type AutocompleteGetTagProps = ({ index }: { index: number }) => {
  key: number;
  'data-tag-index': number;
  tabIndex: -1;
  onDelete: (event: any) => void;
};
/**
 *
 * Demos:
 *
 * - [Autocomplete](https://mui.com/base-ui/react-autocomplete/#hook)
 *
 * API:
 *
 * - [useAutocomplete API](https://mui.com/base-ui/react-autocomplete/hooks-api/#use-autocomplete)
 */
export function useAutocomplete<
  Value,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
>(
  props: UseAutocompleteProps<Value, Multiple, DisableClearable, FreeSolo>,
): UseAutocompleteReturnValue<Value, Multiple, DisableClearable, FreeSolo>;

export interface UseAutocompleteRenderedOption<Value> {
  option: Value;
  index: number;
}

export interface UseAutocompleteReturnValue<
  Value,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
> {
  /**
   * Resolver for the root slot's props.
   * @param externalProps props for the root slot
   * @returns props that should be spread on the root slot
   */
  getRootProps: (externalProps?: any) => React.HTMLAttributes<HTMLDivElement>;
  /**
   * Resolver for the input element's props.
   * @returns props that should be spread on the input element
   */
  getInputProps: () => React.InputHTMLAttributes<HTMLInputElement>;
  /**
   * Resolver for the input label element's props.
   * @returns props that should be spread on the input label element
   */
  getInputLabelProps: () => Omit<React.HTMLAttributes<HTMLLabelElement>, 'color'>;
  /**
   * Resolver for the `clear` button element's props.
   * @returns props that should be spread on the *clear* button element
   */
  getClearProps: () => React.HTMLAttributes<HTMLButtonElement>;
  /**
   * Resolver for the popup icon's props.
   * @returns props that should be spread on the popup icon
   */
  getPopupIndicatorProps: () => React.HTMLAttributes<HTMLButtonElement>;
  /**
   * A tag props getter.
   */
  getTagProps: AutocompleteGetTagProps;
  /**
   * Resolver for the listbox component's props.
   * @returns props that should be spread on the listbox component
   */
  getListboxProps: () => React.HTMLAttributes<HTMLUListElement>;
  /**
   * Resolver for the rendered option element's props.
   * @param renderedOption option rendered on the Autocomplete
   * @returns props that should be spread on the li element
   */
  getOptionProps: (
    renderedOption: UseAutocompleteRenderedOption<Value>,
  ) => React.HTMLAttributes<HTMLLIElement>;
  /**
   * Id for the Autocomplete.
   */
  id: string;
  /**
   * The input value.
   */
  inputValue: string;
  /**
   * The value of the autocomplete.
   */
  value: AutocompleteValue<Value, Multiple, DisableClearable, FreeSolo>;
  /**
   * If `true`, the component input has some values.
   */
  dirty: boolean;
  /**
   * If `true`, the listbox is being displayed.
   */
  expanded: boolean;
  /**
   * If `true`, the popup is open on the component.
   */
  popupOpen: boolean;
  /**
   * If `true`, the component is focused.
   */
  focused: boolean;
  /**
   * An HTML element that is used to set the position of the component.
   */
  anchorEl: null | HTMLElement;
  /**
   * Setter for the component `anchorEl`.
   * @returns function for setting `anchorEl`
   */
  setAnchorEl: () => void;
  /**
   * Index of the focused tag for the component.
   */
  focusedTag: number;
  /**
   * The options to render. It's either `Value[]` or `AutocompleteGroupedOption<Value>[]` if the groupBy prop is provided.
   */
  groupedOptions: Value[] | Array<AutocompleteGroupedOption<Value>>;
}
