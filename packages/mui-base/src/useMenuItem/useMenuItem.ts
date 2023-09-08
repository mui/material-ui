'use client';
import * as React from 'react';
import { unstable_useId as useId, unstable_useForkRef as useForkRef } from '@mui/utils';
import { useButton } from '../useButton';
import {
  MenuItemMetadata,
  UseMenuItemParameters,
  UseMenuItemReturnValue,
  UseMenuItemRootSlotProps,
} from './useMenuItem.types';
import { useListItem } from '../useList';
import { DropdownActionTypes } from '../useDropdown';
import { DropdownContext, DropdownContextValue } from '../useDropdown/DropdownContext';
import { combineHooksSlotProps } from '../utils/combineHooksSlotProps';
import { useCompoundItem } from '../utils/useCompoundItem';
import { MuiCancellableEvent } from '../utils/MuiCancellableEvent';
import { EventHandlers } from '../utils/types';

function idGenerator(existingKeys: Set<string>) {
  return `menu-item-${existingKeys.size}`;
}

const FALLBACK_MENU_CONTEXT: DropdownContextValue = {
  dispatch: () => {},
  popupId: '',
  registerPopup: () => {},
  registerTrigger: () => {},
  state: { open: true },
  triggerElement: null,
};

/**
 *
 * Demos:
 *
 * - [Menu](https://mui.com/base-ui/react-menu/#hooks)
 *
 * API:
 *
 * - [useMenuItem API](https://mui.com/base-ui/react-menu/hooks-api/#use-menu-item)
 */
export function useMenuItem(params: UseMenuItemParameters): UseMenuItemReturnValue {
  const { disabled = false, id: idParam, rootRef: externalRef, label } = params;

  const id = useId(idParam);
  const itemRef = React.useRef<HTMLElement>(null);

  const itemMetadata: MenuItemMetadata = React.useMemo(
    () => ({ disabled, id: id ?? '', label, ref: itemRef }),
    [disabled, id, label],
  );

  const { dispatch } = React.useContext(DropdownContext) ?? FALLBACK_MENU_CONTEXT;

  const {
    getRootProps: getListRootProps,
    highlighted,
    rootRef: listItemRefHandler,
  } = useListItem({
    item: id,
  });

  const { index, totalItemCount } = useCompoundItem(id ?? idGenerator, itemMetadata);

  const {
    getRootProps: getButtonProps,
    focusVisible,
    rootRef: buttonRefHandler,
  } = useButton({
    disabled,
    focusableWhenDisabled: true,
  });

  const handleRef = useForkRef(listItemRefHandler, buttonRefHandler, externalRef, itemRef);

  React.useDebugValue({ id, highlighted, disabled, label });

  const createHandleClick =
    (otherHandlers: EventHandlers) => (event: React.MouseEvent & MuiCancellableEvent) => {
      otherHandlers.onClick?.(event);
      if (event.defaultMuiPrevented) {
        return;
      }

      dispatch({
        type: DropdownActionTypes.close,
        event,
      });
    };

  const getOwnHandlers = <TOther extends EventHandlers>(otherHandlers: TOther = {} as TOther) => ({
    ...otherHandlers,
    onClick: createHandleClick(otherHandlers),
  });

  function getRootProps<TOther extends EventHandlers = {}>(
    otherHandlers: TOther = {} as TOther,
  ): UseMenuItemRootSlotProps<TOther> {
    const getCombinedRootProps = combineHooksSlotProps(
      getOwnHandlers,
      combineHooksSlotProps(getButtonProps, getListRootProps),
    );
    return {
      ...getCombinedRootProps(otherHandlers),
      ref: handleRef,
      role: 'menuitem',
    };
  }

  // If `id` is undefined (during SSR in React < 18), we fall back to rendering a simplified menu item
  // which does not have access to infortmation about its position or highlighted state.
  if (id === undefined) {
    return {
      getRootProps,
      disabled: false,
      focusVisible,
      highlighted: false,
      index: -1,
      totalItemCount: 0,
      rootRef: handleRef,
    };
  }

  return {
    getRootProps,
    disabled,
    focusVisible,
    highlighted,
    index,
    totalItemCount,
    rootRef: handleRef,
  };
}
