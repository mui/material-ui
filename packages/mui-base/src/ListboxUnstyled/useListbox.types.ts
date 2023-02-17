import * as React from 'react';

type UseListboxStrictParametersRequiredKeys =
  | 'isOptionDisabled'
  | 'disableListWrap'
  | 'disabledItemsFocusable'
  | 'optionComparer'
  | 'optionStringifier'
  | 'selectionLimit';

export type UseListboxParametersWithDefaults<TOption> = Omit<
  UseListboxParameters<TOption>,
  UseListboxStrictParametersRequiredKeys
> &
  Required<Pick<UseListboxParameters<TOption>, UseListboxStrictParametersRequiredKeys>>;

export type FocusManagementType = 'DOM' | 'activeDescendant';

enum ActionTypes {
  blur = 'blur',
  focus = 'focus',
  keyDown = 'keyDown',
  optionClick = 'optionClick',
  optionHover = 'optionHover',
  optionsChange = 'optionsChange',
  setValue = 'setValue',
  setHighlight = 'setHighlight',
  textNavigation = 'textNagivation',
}

// split declaration and export due to https://github.com/codesandbox/codesandbox-client/issues/6435
export { ActionTypes };

interface OptionClickAction<TOption> {
  type: ActionTypes.optionClick;
  option: TOption;
  event: React.MouseEvent;
}

interface OptionHoverAction<TOption> {
  type: ActionTypes.optionHover;
  option: TOption;
  event: React.MouseEvent;
}

interface FocusAction {
  type: ActionTypes.focus;
  event: React.FocusEvent;
}

interface BlurAction {
  type: ActionTypes.blur;
  event: React.FocusEvent;
}

interface KeyDownAction {
  type: ActionTypes.keyDown;
  event: React.KeyboardEvent;
}

interface SetValueAction<TOption> {
  type: ActionTypes.setValue;
  event: null;
  value: TOption[];
}

interface SetHighlightAction<TOption> {
  type: ActionTypes.setHighlight;
  event: null;
  highlight: TOption | null;
}

interface TextNavigationAction {
  type: ActionTypes.textNavigation;
  event: React.KeyboardEvent;
  searchString: string;
}

interface OptionsChangeAction<TOption> {
  type: ActionTypes.optionsChange;
  event: null;
  options: TOption[];
  previousOptions: TOption[];
}

export type ListboxAction<TOption> =
  | OptionClickAction<TOption>
  | OptionHoverAction<TOption>
  | FocusAction
  | BlurAction
  | KeyDownAction
  | SetHighlightAction<TOption>
  | TextNavigationAction
  | SetValueAction<TOption>
  | OptionsChangeAction<TOption>;

export type ListboxReducerAction<T> = ListboxAction<T> & {
  props: UseListboxParametersWithDefaults<T>;
};

export interface ListboxState<TOption> {
  highlightedValue: TOption | null;
  selectedValue: TOption[];
}

export type ListboxReducer<TOption> = (
  state: ListboxState<TOption>,
  action: ListboxReducerAction<TOption>,
) => ListboxState<TOption>;

export interface UseListboxParameters<TOption> {
  /**
   * The default selected value. Use when the listbox is not controlled.
   */
  defaultValue?: TOption[];
  /**
   * If `true`, it will be possible to highlight disabled options.
   * @default false
   */
  disabledItemsFocusable?: boolean;
  /**
   * If `true`, the highlight will not wrap around the list if arrow keys are used.
   * @default false
   */
  disableListWrap?: boolean;
  focusManagement?: FocusManagementType;
  /**
   * Id attribute of the listbox.
   */
  id?: string;
  /**
   * A function that determines if a particular option is disabled.
   * @default () => false
   */
  isOptionDisabled?: (option: TOption, index: number) => boolean;
  /**
   * Ref of the listbox DOM element.
   */
  listboxRef?: React.Ref<any>;
  /**
   * Callback fired when the value changes.
   */
  onChange?: (
    e: React.MouseEvent | React.KeyboardEvent | React.FocusEvent | null,
    value: TOption[],
  ) => void;
  /**
   * Callback fired when the highlighted option changes.
   */
  onHighlightChange?: (
    e: React.MouseEvent | React.KeyboardEvent | React.FocusEvent | null,
    option: TOption | null,
  ) => void;
  /**
   * A function that tests equality between two options.
   * @default (a, b) => a === b
   */
  optionComparer?: (optionA: TOption, optionB: TOption) => boolean;
  /**
   * A function that generates the id attribute of individual options.
   */
  optionIdGenerator?: (option: TOption, index: number) => string;
  /**
   * A function that converts an object to its string representation
   * @default (o) => o
   */
  optionStringifier?: (option: TOption) => string | undefined;
  /**
   * Array of options to be rendered in the list.
   */
  options: TOption[];
  /**
   * Maximum number of options that can be selected at once.
   * Set to `null` to disable the limit.
   */
  selectionLimit?: number | null;
  /**
   * Custom state reducer function. It calculates the new state (highlighted and selected options)
   * based on the previous one and the performed action.
   */
  stateReducer?: ListboxReducer<TOption>;
  /**
   * The selected value. Use when the listbox is controlled.
   */
  value?: TOption[];
}

export interface OptionState {
  disabled: boolean;
  highlighted: boolean;
  index: number;
  selected: boolean;
}

interface UseListboxRootSlotOwnProps {
  'aria-activedescendant'?: React.AriaAttributes['aria-activedescendant'];
  id?: string;
  onBlur: React.FocusEventHandler;
  onKeyDown: React.KeyboardEventHandler;
  role: React.AriaRole;
  tabIndex: number;
  ref: React.Ref<any>;
}

export type UseListboxRootSlotProps<TOther = {}> = TOther & UseListboxRootSlotOwnProps;

interface UseListboxOptionSlotOwnProps {
  'aria-disabled': React.AriaAttributes['aria-disabled'];
  'aria-selected': React.AriaAttributes['aria-selected'];
  id?: string;
  onClick: React.MouseEventHandler;
  onPointerOver: React.PointerEventHandler;
  role: React.AriaRole;
  tabIndex?: number;
}

export type UseListboxOptionSlotProps<TOther = {}> = Omit<
  TOther,
  keyof UseListboxOptionSlotOwnProps
> &
  UseListboxOptionSlotOwnProps;
