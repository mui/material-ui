'use client';
import * as React from 'react';
import { unstable_useForkRef as useForkRef, unstable_useId as useId } from '@mui/utils';
import { SelectOption, UseOptionParameters, UseOptionReturnValue } from './useOption.types';
import { extractEventHandlers } from '../utils/extractEventHandlers';
import { useListItem } from '../useList';
import { useCompoundItem } from '../useCompound';

/**
 *
 * Demos:
 *
 * - [Select](https://mui.com/base-ui/react-select/#hooks)
 *
 * API:
 *
 * - [useOption API](https://mui.com/base-ui/react-select/hooks-api/#use-option)
 */
export function useOption<Value>(params: UseOptionParameters<Value>): UseOptionReturnValue {
  const { value, label, disabled, rootRef: optionRefParam, id: idParam } = params;

  const {
    getRootProps: getListItemProps,
    highlighted,
    selected,
  } = useListItem({
    item: value,
  });

  const id = useId(idParam);

  const optionRef = React.useRef<Element>(null);

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

  const handleRef = useForkRef(optionRefParam, optionRef)!;

  return {
    getRootProps: <ExternalProps extends Record<string, unknown> = {}>(
      externalProps: ExternalProps = {} as ExternalProps,
    ) => {
      const externalEventHandlers = extractEventHandlers(externalProps);
      return {
        ...externalProps,
        ...getListItemProps(externalEventHandlers),
        id,
        ref: handleRef,
        role: 'option',
        'aria-selected': selected,
      };
    },
    highlighted,
    index,
    selected,
    rootRef: handleRef,
  };
}
