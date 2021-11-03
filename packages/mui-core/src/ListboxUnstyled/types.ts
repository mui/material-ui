type UseListboxStrictPropsRequiredKeys =
  | 'isOptionDisabled'
  | 'disableListWrap'
  | 'disabledItemsFocusable'
  | 'isOptionEqualToValue'
  | 'selectMultiple';

export type UseListboxStrictProps<TOption> = Omit<
  UseListboxProps<TOption>,
  UseListboxStrictPropsRequiredKeys
> &
  Required<Pick<UseListboxProps<TOption>, UseListboxStrictPropsRequiredKeys>>;

interface OptionClickAction<TOption> {
  type: 'optionClick';
  optionIndex: number;
  option: TOption;
  event: React.MouseEvent;
  props: UseListboxStrictProps<TOption>;
}

interface FocusAction<TOption> {
  type: 'focus';
  event: React.FocusEvent;
  props: UseListboxStrictProps<TOption>;
}

interface BlurAction<TOption> {
  type: 'blur';
  event: React.FocusEvent;
  props: UseListboxStrictProps<TOption>;
}

interface KeyDownAction<TOption> {
  type: 'keyDown';
  event: React.KeyboardEvent;
  props: UseListboxStrictProps<TOption>;
}

interface SetControlledValueAction<TOption> {
  type: 'setControlledValue';
  value: TOption | TOption[] | null;
}

export type ListboxAction<TOption> =
  | OptionClickAction<TOption>
  | FocusAction<TOption>
  | BlurAction<TOption>
  | KeyDownAction<TOption>
  | SetControlledValueAction<TOption>;

export interface ListboxState<TOption> {
  highlightedIndex: number;
  selectedValue: TOption | TOption[] | null;
}

type ListboxReducer<TOption> = (
  state: ListboxState<TOption>,
  action: ListboxAction<TOption>,
) => ListboxState<TOption>;

export type CustomListboxReducer<TOption> = (
  state: ListboxState<TOption>,
  action: ListboxAction<TOption>,
  defaultReducer: ListboxReducer<TOption>,
) => ListboxState<TOption>;

interface UseListboxCommonProps<TOption> {
  /**
   * Array of options to be rendered in the list.
   */
  options: TOption[];
  /**
   * A function that determines if a particular option is disabled.
   * @default () => false
   */
  isOptionDisabled?: (option: TOption, index: number) => boolean;
  /**
   * A function that tests equality between two options.
   * @default (a, b) => a === b
   */
  isOptionEqualToValue?: (option: TOption, value: TOption) => boolean;
  /**
   * If `true`, the highlight will not wrap around the list if arrow keys are used.
   * @default false
   */
  disableListWrap?: boolean;
  /**
   * If `true`, it will be possible to highlight disabled options.
   * @default false
   */
  disabledItemsFocusable?: boolean;
  /**
   * Custom state reducer function. It calculates the new state (highlighted and selected options)
   * based on the previous one and the performed action.
   */
  stateReducer?: CustomListboxReducer<TOption>;
  /**
   * Callback fired when the highlighted option changes.
   */
  onHighlightChange?: (option: TOption | null) => void;
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
  selectMultiple?: false;
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
  selectMultiple: true;
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
