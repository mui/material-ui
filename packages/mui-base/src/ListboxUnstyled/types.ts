type UseListboxStrictPropsRequiredKeys =
  | 'isOptionDisabled'
  | 'disableListWrap'
  | 'disabledItemsFocusable'
  | 'optionComparer'
  | 'multiple';

export type UseListboxStrictProps<TOption> = Omit<
  UseListboxProps<TOption>,
  UseListboxStrictPropsRequiredKeys
> &
  Required<Pick<UseListboxProps<TOption>, UseListboxStrictPropsRequiredKeys>>;

enum ActionTypes {
  blur = 'blur',
  focus = 'focus',
  keyDown = 'keyDown',
  optionClick = 'optionClick',
  setControlledValue = 'setControlledValue',
  optionsChange = 'optionsChange',
}

// split declaration and export due to https://github.com/codesandbox/codesandbox-client/issues/6435
export { ActionTypes };

interface OptionClickAction<TOption> {
  type: ActionTypes.optionClick;
  option: TOption;
  event: React.MouseEvent;
  props: UseListboxStrictProps<TOption>;
}

interface FocusAction<TOption> {
  type: ActionTypes.focus;
  event: React.FocusEvent;
  props: UseListboxStrictProps<TOption>;
}

interface BlurAction<TOption> {
  type: ActionTypes.blur;
  event: React.FocusEvent;
  props: UseListboxStrictProps<TOption>;
}

interface KeyDownAction<TOption> {
  type: ActionTypes.keyDown;
  event: React.KeyboardEvent;
  props: UseListboxStrictProps<TOption>;
}

interface SetControlledValueAction<TOption> {
  type: ActionTypes.setControlledValue;
  value: TOption | TOption[] | null;
  props: UseListboxStrictProps<TOption>;
}

interface OptionsChangeAction<TOption> {
  type: ActionTypes.optionsChange;
  options: TOption[];
  previousOptions: TOption[];
  props: UseListboxStrictProps<TOption>;
}

export type ListboxAction<TOption> =
  | OptionClickAction<TOption>
  | FocusAction<TOption>
  | BlurAction<TOption>
  | KeyDownAction<TOption>
  | SetControlledValueAction<TOption>
  | OptionsChangeAction<TOption>;

export interface ListboxState<TOption> {
  highlightedIndex: number;
  selectedValue: TOption | TOption[] | null;
}

export type ListboxReducer<TOption> = (
  state: ListboxState<TOption>,
  action: ListboxAction<TOption>,
) => ListboxState<TOption>;

interface UseListboxCommonProps<TOption> {
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
  /**
   * Ref of the listbox DOM element.
   */
  listboxRef?: React.Ref<any>;
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
   * Callback fired when the highlighted option changes.
   */
  onHighlightChange?: (option: TOption | null) => void;
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
   * Array of options to be rendered in the list.
   */
  options: TOption[];
  /**
   * Custom state reducer function. It calculates the new state (highlighted and selected options)
   * based on the previous one and the performed action.
   */
  stateReducer?: ListboxReducer<TOption>;
}

interface UseSingleSelectListboxProps<TOption> extends UseListboxCommonProps<TOption> {
  /**
   * The default selected value. Use when the component is not controlled.
   */
  defaultValue?: TOption | null;
  /**
   * If `true`, the component will allow to select multiple options.
   * @default false
   */
  multiple?: false;
  /**
   * The selected value. Use when the component is controlled.
   */
  value?: TOption | null;
  /**
   * Callback fired when the value changes.
   */
  onChange?: (value: TOption) => void;
}

interface UseMultiSelectListboxProps<TOption> extends UseListboxCommonProps<TOption> {
  /**
   * The default selected value. Use when the component is not controlled.
   */
  defaultValue?: TOption[];
  /**
   * If `true`, the component will allow to select multiple options.
   * @default false
   */
  multiple: true;
  /**
   * The selected value. Use when the component is controlled.
   */
  value?: TOption[];
  /**
   * Callback fired when the value changes.
   */
  onChange?: (value: TOption[]) => void;
}

export type UseListboxProps<TOption> =
  | UseSingleSelectListboxProps<TOption>
  | UseMultiSelectListboxProps<TOption>;

export interface OptionState {
  disabled: boolean;
  highlighted: boolean;
  selected: boolean;
}
