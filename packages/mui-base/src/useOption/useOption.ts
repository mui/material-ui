'use client';
import * as React from 'react';
import { unstable_useForkRef as useForkRef, unstable_useId as useId } from '@mui/utils';
import { SelectOption, UseOptionParameters, UseOptionReturnValue } from './useOption.types';
import { extractEventHandlers } from '../utils/extractEventHandlers';
import { useListItem } from '../useList';
import { useCompoundItem } from '../useCompound';
import { useButton } from '../useButton';
import { combineHooksSlotProps } from '../utils/combineHooksSlotProps';
import { MuiCancellableEvent } from '../utils/MuiCancellableEvent';
import { EventHandlers } from '../utils/types';

/**
 *
 * Demos:
 *
 * - [Select](https://next.mui.com/base-ui/react-select/#hooks)
 *
 * API:
 *
 * - [useOption API](https://next.mui.com/base-ui/react-select/hooks-api/#use-option)
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

  const { getRootProps: getButtonProps, rootRef: buttonRefHandler } = useButton({
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

  const handleRef = useForkRef(optionRefParam, optionRef, buttonRefHandler)!;

  const createHandleKeyDown =
    (otherHandlers: EventHandlers) => (event: React.KeyboardEvent & MuiCancellableEvent) => {
      otherHandlers.onKeyDown?.(event);
      if (event.defaultMuiPrevented) {
        return;
      }

      if ([' ', 'Enter'].includes(event.key)) {
        event.defaultMuiPrevented = true; // prevent listbox onKeyDown
      }
    };

  const getOwnHandlers = (otherHandlers: EventHandlers = {}) => ({
    onKeyDown: createHandleKeyDown(otherHandlers),
  });

  return {
    getRootProps: <ExternalProps extends Record<string, unknown> = {}>(
      externalProps: ExternalProps = {} as ExternalProps,
    ) => {
      const externalEventHandlers = extractEventHandlers(externalProps);
      const getCombinedRootProps = combineHooksSlotProps(
        getListItemProps,
        combineHooksSlotProps(getButtonProps, getOwnHandlers),
      );
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
    highlighted,
    index,
    selected,
    rootRef: handleRef,
  };
}
