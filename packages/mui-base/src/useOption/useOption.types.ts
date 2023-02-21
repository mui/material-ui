import { UseSelectOptionSlotProps } from '../useSelect';
import { EventHandlers } from '../utils';

export interface UseOptionParameters<Value> {
  disabled: boolean;
  value: Value;
  optionRef?: React.Ref<HTMLElement>;
}

export interface UseOptionReturnValue {
  selected: boolean;
  highlighted: boolean;
  index: number;
  getRootProps: <Other extends EventHandlers>(
    otherHandlers?: Other,
  ) => UseOptionRootSlotProps<Other>;
}

export type UseOptionRootSlotProps<Other extends EventHandlers = {}> = UseSelectOptionSlotProps & {
  ref?: React.RefCallback<HTMLElement> | null;
} & Other;
