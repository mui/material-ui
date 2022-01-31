import { SelectOption, SelectUnstyledCommonProps } from '../SelectUnstyled';

export default interface MultiSelectUnstyledProps<TValue extends {}>
  extends SelectUnstyledCommonProps {
  /**
   * The default selected values. Use when the component is not controlled.
   * @default []
   */
  defaultValue?: TValue[];
  /**
   * Callback fired when an option is selected.
   */
  onChange?: (value: TValue[]) => void;
  /**
   * Function that customizes the rendering of the selected values.
   */
  renderValue?: (option: SelectOption<TValue>[]) => React.ReactNode;
  /**
   * The selected values.
   * Set to an empty array to deselect all options.
   */
  value?: TValue[];
}

export interface MultiSelectUnstyledOwnerState<TValue> extends MultiSelectUnstyledProps<TValue> {
  active: boolean;
  disabled: boolean;
  open: boolean;
  focusVisible: boolean;
}
