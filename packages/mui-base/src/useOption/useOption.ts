import * as React from 'react';
import { unstable_useForkRef as useForkRef, unstable_useId as useId } from '@mui/utils';
import { SelectOption, UseOptionParameters, UseOptionReturnValue } from './useOption.types';
import { EventHandlers } from '../utils';
import { useListItem } from '../useList';
import { useCompoundItem } from '../utils/useCompoundItem';

/**
 *
 * Demos:
 *
 * - [Select](https://mui.com/base/react-select/#hooks)
 *
 * API:
 *
 * - [useOption API](https://mui.com/base/react-select/hooks-api/#use-option)
 */
export default function useOption<Value>(params: UseOptionParameters<Value>): UseOptionReturnValue {
  const { value, label, disabled, optionRef: optionRefParam, id: idParam } = params;

  const {
    getRootProps: getListItemProps,
    ref: listItemRefHandler,
    highlighted,
    selected,
  } = useListItem({
    item: value,
  });

  const id = useId(idParam);

  const optionRef = React.useRef<HTMLElement>(null);

  const selectOption: SelectOption<Value> = React.useMemo(
    () => ({
      disabled,
      label,
      value,
      ref: optionRef,
      id,
    }),
    [disabled, label, value, id],
  );

  const { index } = useCompoundItem<Value, SelectOption<Value>>(value, selectOption);

  const handleRef = useForkRef(optionRefParam, optionRef, listItemRefHandler)!;

  return {
    getRootProps: <Other extends EventHandlers = {}>(otherHandlers: Other = {} as Other) => ({
      ...otherHandlers,
      ...getListItemProps(otherHandlers),
      id,
      ref: handleRef,
      role: 'option',
      'aria-selected': selected,
    }),
    highlighted,
    index,
    selected,
    ref: handleRef,
  };
}
