export interface SelectOption<TValue> {
  value: TValue;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface SelectOptionGroup<TValue> {
  options: SelectChild<TValue>[];
  label: React.ReactNode;
  disabled?: boolean;
}

export type SelectChild<TValue> = SelectOption<TValue> | SelectOptionGroup<TValue>;

export function isOptionGroup<TValue>(
  child: SelectChild<TValue>,
): child is SelectOptionGroup<TValue> {
  return !!(child as SelectOptionGroup<TValue>).options;
}

interface UseSelectCommonProps<TValue> {
  buttonComponent?: React.ElementType;
  buttonRef?: React.Ref<Element>;
  disabled?: boolean;
  listboxId?: string;
  listboxRef?: React.Ref<Element>;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  options: SelectOption<TValue>[];
}

export interface UseSelectSingleProps<TValue> extends UseSelectCommonProps<TValue> {
  defaultValue?: TValue | null;
  multiple?: false;
  onChange?: (value: TValue | null) => void;
  value?: TValue | null;
}

export interface UseSelectMultiProps<TValue> extends UseSelectCommonProps<TValue> {
  defaultValue?: TValue[];
  multiple: true;
  onChange?: (value: TValue[]) => void;
  value?: TValue[];
}

export type UseSelectProps<TValue> = UseSelectSingleProps<TValue> | UseSelectMultiProps<TValue>;
