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
  options: TOption[];
  isOptionDisabled?: (option: TOption, index: number) => boolean;
  isOptionEqualToValue?: (option: TOption, value: TOption) => boolean;
  disableListWrap?: boolean;
  disabledItemsFocusable?: boolean;
  stateReducer?: CustomListboxReducer<TOption>;
  /**
   * Callback fired when the highlighted option changes.
   */
  onHighlightChange?: (option: TOption | null) => void;
}

interface UseSingleSelectListboxProps<TOption> extends UseListboxCommonProps<TOption> {
  defaultValue?: TOption | null;
  selectMultiple?: false;
  value?: TOption | null;
  /**
   * Callback fired when the value changes.
   */
  onChange?: (value: TOption) => void;
}

interface UseMultiSelectListboxProps<TOption> extends UseListboxCommonProps<TOption> {
  defaultValue?: TOption[];
  selectMultiple: true;
  value?: TOption[];
  /**
   * Callback fired when the value changes.
   */
  onChange?: (value: TOption[]) => void;
}

export type UseListboxProps<TOption> =
  | UseSingleSelectListboxProps<TOption>
  | UseMultiSelectListboxProps<TOption>;
