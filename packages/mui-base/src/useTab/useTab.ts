'use client';
import * as React from 'react';
import { unstable_useId as useId, unstable_useForkRef as useForkRef } from '@mui/utils';
import { useTabsContext } from '../Tabs';
import { UseTabParameters, UseTabReturnValue, UseTabRootSlotProps } from './useTab.types';
import { extractEventHandlers } from '../utils/extractEventHandlers';
import { useCompoundItem } from '../useCompound';
import { useListItem } from '../useList';
import { useButton } from '../useButton';
import { TabMetadata } from '../useTabs';
import { combineHooksSlotProps } from '../utils/combineHooksSlotProps';

function tabValueGenerator(otherTabValues: Set<string | number>) {
  return otherTabValues.size;
}

/**
 *
 * Demos:
 *
 * - [Tabs](https://next.mui.com/base-ui/react-tabs/#hooks)
 *
 * API:
 *
 * - [useTab API](https://next.mui.com/base-ui/react-tabs/hooks-api/#use-tab)
 */
function useTab(parameters: UseTabParameters): UseTabReturnValue {
  const { value: valueParam, rootRef: externalRef, disabled = false, id: idParam } = parameters;

  const tabRef = React.useRef<HTMLElement>(null);
  const id = useId(idParam);

  const { value: selectedValue, selectionFollowsFocus, getTabPanelId } = useTabsContext();

  const tabMetadata = React.useMemo(() => ({ disabled, ref: tabRef, id }), [disabled, tabRef, id]);

  const {
    id: value,
    index,
    totalItemCount: totalTabsCount,
  } = useCompoundItem<string | number, TabMetadata>(valueParam ?? tabValueGenerator, tabMetadata);

  const {
    getRootProps: getTabProps,
    highlighted,
    selected,
  } = useListItem({
    item: value,
  });

  const {
    getRootProps: getButtonProps,
    rootRef: buttonRefHandler,
    active,
    focusVisible,
    setFocusVisible,
  } = useButton({
    disabled,
    focusableWhenDisabled: !selectionFollowsFocus,
    type: 'button',
  });

  const handleRef = useForkRef(tabRef, externalRef, buttonRefHandler);

  const tabPanelId = value !== undefined ? getTabPanelId(value) : undefined;

  const getRootProps = <ExternalProps extends Record<string, unknown>>(
    externalProps: ExternalProps = {} as ExternalProps,
  ): UseTabRootSlotProps<ExternalProps> => {
    const externalEventHandlers = extractEventHandlers(externalProps);
    const getCombinedRootProps = combineHooksSlotProps(getTabProps, getButtonProps);

    return {
      ...externalProps,
      ...getCombinedRootProps(externalEventHandlers),
      role: 'tab',
      'aria-controls': tabPanelId,
      'aria-selected': selected,
      id,
      ref: handleRef,
    };
  };

  return {
    getRootProps,
    active,
    focusVisible,
    highlighted,
    index,
    rootRef: handleRef,
    // the `selected` state isn't set on the server (it relies on effects to be calculated),
    // so we fall back to checking the `value` prop with the selectedValue from the TabsContext
    selected: selected || value === selectedValue,
    setFocusVisible,
    totalTabsCount,
  };
}

export { useTab };
