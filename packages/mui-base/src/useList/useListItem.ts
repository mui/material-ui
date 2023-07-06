'use client';
import * as React from 'react';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import { extractEventHandlers } from '../utils/extractEventHandlers';
import { EventHandlers } from '../utils/types';
import { UseListItemParameters, UseListItemReturnValue } from './useListItem.types';
import { ListActionTypes } from './listActions.types';

/**
 * Contains the logic for an item of a list-like component (e.g. Select, Menu, etc.).
 * It provides information about the item's state (selected, highlighted) and
 * handles the item's mouse events.
 *
 * @template ItemValue The type of the item's value. This should be consistent with the type of useList's `items` parameter.
 * @ignore - internal hook.
 */
export function useListItem<ItemValue>(
  parameters: UseListItemParameters<ItemValue>,
): UseListItemReturnValue {
  const {
    handlePointerOverEvents = false,
    item,
    rootRef: externalRef,
    dispatch,
    highlighted,
    focusable,
  } = parameters;

  const itemRef = React.useRef<Element>(null);
  const handleRef = useForkRef(itemRef, externalRef);

  const createHandleClick = React.useCallback(
    (externalHandlers: EventHandlers) => (event: React.MouseEvent) => {
      externalHandlers.onClick?.(event);
      if (event.defaultPrevented) {
        return;
      }

      if (process.env.NODE_ENV !== 'production') {
        if (item === undefined) {
          throw new Error(
            [
              'MUI: The `item` provided to useListItem() is undefined.',
              'This should happen only during server-side rendering under React 17.',
            ].join('\n'),
          );
        }
      }

      dispatch({
        type: ListActionTypes.itemClick,
        item: item!,
        event,
      });
    },
    [dispatch, item],
  );

  const createHandlePointerOver = React.useCallback(
    (externalHandlers: EventHandlers) => (event: React.PointerEvent) => {
      externalHandlers.onMouseOver?.(event);
      if (event.defaultPrevented) {
        return;
      }

      if (process.env.NODE_ENV !== 'production') {
        if (item === undefined) {
          throw new Error(
            [
              'MUI: The `item` provided to useListItem() is undefined.',
              'This should happen only during server-side rendering under React 17.',
            ].join('\n'),
          );
        }
      }

      dispatch({
        type: ListActionTypes.itemHover,
        item: item!,
        event,
      });
    },
    [dispatch, item],
  );

  let tabIndex: number | undefined;
  if (focusable) {
    tabIndex = highlighted ? 0 : -1;
  }

  const getRootProps = <ExternalProps extends Record<string, any>>(
    externalProps: ExternalProps = {} as ExternalProps,
  ) => {
    const externalEventHandlers = extractEventHandlers(externalProps);
    return {
      ...externalProps,
      onClick: createHandleClick(externalEventHandlers),
      onPointerOver: handlePointerOverEvents
        ? createHandlePointerOver(externalEventHandlers)
        : undefined,
      ref: handleRef,
      tabIndex,
    };
  };

  return {
    getRootProps,
    rootRef: handleRef,
  };
}
