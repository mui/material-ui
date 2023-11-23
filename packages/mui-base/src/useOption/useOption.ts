'use client';
import * as React from 'react';
import { unstable_useForkRef as useForkRef, unstable_useId as useId } from '@mui/utils';
import { SelectOption, UseOptionParameters, UseOptionReturnValue } from './useOption.types';
import { extractEventHandlers } from '../utils/extractEventHandlers';
import { useListItem } from '../useList';
import { useCompoundItem } from '../utils/useCompoundItem';
import { useButton } from '../useButton';
import { combineHooksSlotProps } from '../utils/combineHooksSlotProps';

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
    rootRef: listItemRefHandler,
    highlighted,
    selected,
  } = useListItem({
    item: value,
  });

  const {
    getRootProps: getButtonProps,
    rootRef: buttonRefHandler,
    focusVisible,
  } = useButton({
    disabled,
    focusableWhenDisabled: true,
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

  const handleRef = useForkRef(optionRefParam, optionRef, listItemRefHandler, buttonRefHandler)!;

  return {
    getRootProps: <ExternalProps extends Record<string, unknown> = {}>(
      externalProps: ExternalProps = {} as ExternalProps,
    ) => {
      const externalEventHandlers = extractEventHandlers(externalProps);
      const getCombinedRootProps = combineHooksSlotProps(getListItemProps, getButtonProps);
      return {
        ...externalProps,
        ...externalEventHandlers,
        ...getCombinedRootProps(externalEventHandlers),
        id,
        ref: handleRef,
        role: 'option',
        'aria-selected': selected,
      };
    },
    focusVisible,
    highlighted,
    index,
    selected,
    rootRef: handleRef,
  };
}
