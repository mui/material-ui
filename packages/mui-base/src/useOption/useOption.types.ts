import { UseListItemRootSlotProps } from '../useList';
import { EventHandlers } from '../utils';

export interface SelectOption<Value> {
  value: Value;
  label: React.ReactNode;
  disabled?: boolean;
  ref: React.RefObject<Element>;
  id?: string;
}

export interface UseOptionParameters<Value> {
  disabled: boolean;
  label: string | React.ReactNode;
  value: Value;
  rootRef?: React.Ref<Element>;
  id?: string;
}

export interface UseOptionReturnValue {
  selected: boolean;
  highlighted: boolean;
  index: number;
  getRootProps: <Other extends EventHandlers>(
    otherHandlers?: Other,
  ) => UseOptionRootSlotProps<Other>;
  rootRef: React.RefCallback<Element> | null;
}

export type UseOptionRootSlotProps<Other extends EventHandlers = {}> =
  UseListItemRootSlotProps<Other> & {
    ref?: React.RefCallback<Element> | null;
  } & Other;
