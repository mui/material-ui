import { SelectOption } from './useSelectProps';

export interface SelectUnstyledComponentsPropsOverrides {}

interface SelectUnstyledCommonProps {
  /**
   * If `true`, the select element is focused during the first mount
   * @default false
   */
  autoFocus?: boolean;
  children?: React.ReactNode;
  className?: string;
  component?: React.ElementType;
  /**
   * The components used for each slot inside the Select.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components?: {
    Root?: React.ElementType;
    Listbox?: React.ElementType;
  };
  /**
   * The props used for each slot inside the Input.
   * @default {}
   */
  componentsProps?: {
    root?: React.ComponentPropsWithRef<'button'> & SelectUnstyledComponentsPropsOverrides;
    listbox?: React.ComponentPropsWithRef<'ul'> & SelectUnstyledComponentsPropsOverrides;
  };
  /**
   * If `true`, the select is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Id of the listbox element.
   */
  listboxId?: string;
  /**
   * If `true`, the select will be initially open.
   * @default false
   */
  defaultListboxOpen?: boolean;
  /**
   * Controls the open state of the select's listbox.
   * @default undefined
   */
  listboxOpen?: boolean;
  /**
   * Callback fired when the component requests to be opened.
   * Use in controlled mode (see listboxOpen).
   */
  onListboxOpenChange?: (isOpen: boolean) => void;
}

export interface SingleSelectUnstyledProps<TValue> extends SelectUnstyledCommonProps {
  /**
   * The default selected value. Use when the component is not controlled.
   */
  defaultValue?: TValue | null;
  /**
   * Callback fired when an option is selected.
   */
  onChange?: (value: TValue | null) => void;
  /**
   * Function that customizes the rendering of the selected value.
   */
  renderValue?: (option: SelectOption<TValue> | null) => React.ReactNode;
  /**
   * The selected value.
   * Set to `null` to deselect all options.
   */
  value?: TValue | null;
}

export interface MultiSelectUnstyledProps<TValue> extends SelectUnstyledCommonProps {
  /**
   * The default selected values. Use when the component is not controlled.
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

type SelectUnstyledProps<TValue> =
  | (SingleSelectUnstyledProps<TValue> & { multiple?: false })
  | (MultiSelectUnstyledProps<TValue> & {
      /**
       * If `true`, it will be possible to select multiple values.
       */
      multiple: true;
    });

export interface SingleSelectUnstyledOwnerState<TValue> extends SingleSelectUnstyledProps<TValue> {
  active: boolean;
  disabled: boolean;
  open: boolean;
  focusVisible: boolean;
}

export interface MultiSelectUnstyledOwnerState<TValue> extends MultiSelectUnstyledProps<TValue> {
  active: boolean;
  disabled: boolean;
  open: boolean;
  focusVisible: boolean;
}

export default SelectUnstyledProps;
