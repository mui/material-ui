import * as React from 'react';
import { ListAction, ListState, UseListRootSlotProps } from '../useList';
import { MenuItemMetadata } from '../useMenuItem';
import { EventHandlers } from '../utils/types';
import { MenuProviderValue } from './MenuProvider';

export interface UseMenuParameters {
  /**
   * The id of the menu. If not provided, it will be generated.
   */
  id?: string;
  /**
   * Callback fired when the menu items change.
   */
  onItemsChange?: (items: string[]) => void;
  /**
   * The ref to the menu's listbox node.
   */
  listboxRef?: React.Ref<Element>;
}

export interface UseMenuReturnValue {
  /**
   * The value to be passed into the MenuProvider.
   */
  contextValue: MenuProviderValue;
  /**
   * Action dispatcher for the menu component.
   * Allows to programmatically control the menu.
   */
  dispatch: (action: ListAction<string>) => void;
  /**
   * Resolver for the listbox slot's props.
   * @param otherHandlers event handlers for the listbox component
   * @returns props that should be spread on the listbox component
   */
  getListboxProps: <TOther extends EventHandlers>(
    otherHandlers?: TOther,
  ) => UseMenuListboxSlotProps;
  /**
   * The highlighted option in the menu listbox.
   */
  highlightedValue: string | null;
  /**
   * The ref to the menu's listbox node.
   */
  listboxRef: React.RefCallback<Element> | null;
  /**
   * Items in the menu listbox.
   */
  menuItems: Map<string, MenuItemMetadata>;
  /**
   * If `true`, the menu is open.
   */
  open: boolean;
  /**
   * An element that triggers the visibility of the menu.
   */
  triggerElement: HTMLElement | null;
}

interface UseMenuListboxSlotEventHandlers {
  onBlur: React.FocusEventHandler;
  onKeyDown: React.KeyboardEventHandler;
}

export type UseMenuListboxSlotProps<TOther = {}> = UseListRootSlotProps<
  Omit<TOther, keyof UseMenuListboxSlotEventHandlers> & UseMenuListboxSlotEventHandlers
> & {
  ref: React.RefCallback<Element> | null;
  role: React.AriaRole;
};

export interface MenuInternalState extends ListState<string> {}
