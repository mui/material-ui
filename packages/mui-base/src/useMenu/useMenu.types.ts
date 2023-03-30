import * as React from 'react';
import { ListState, UseListRootSlotProps } from '../useList';
import { MenuItemMetadata } from '../useMenuItem';
import { EventHandlers } from '../utils/types';
import { MenuProviderValue } from './MenuProvider';

export interface UseMenuParameters {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  listboxId?: string;
  listboxRef?: React.Ref<any>;
}

export interface UseMenuReturnValue {
  /**
   * The value to be passed into the MenuProvider.
   */
  contextValue: MenuProviderValue;
  /**
   * Resolver for the listbox component's props.
   * @param otherHandlers event handlers for the listbox component
   * @returns props that should be spread on the listbox component
   */
  getListboxProps: <TOther extends EventHandlers>(
    otherHandlers?: TOther,
  ) => UseMenuListboxSlotProps;
  /**
   * The highlighted option in the menu listbox.
   */
  highlightedOption: string | null;
  /**
   * Callback for highlighting the first item in the menu listbox.
   */
  highlightFirstItem: () => void;
  /**
   * Callback for highlighting the last item in the menu listbox.
   */
  highlightLastItem: () => void;
  /**
   * Items in the menu listbox.
   */
  menuItems: Map<string, MenuItemMetadata>;
  /**
   * If `true`, the menu is open.
   */
  open: boolean;
}

interface UseMenuListboxSlotEventHandlers {
  onBlur: React.FocusEventHandler;
  onKeyDown: React.KeyboardEventHandler;
}

export type UseMenuListboxSlotProps<TOther = {}> = UseListRootSlotProps<
  Omit<TOther, keyof UseMenuListboxSlotEventHandlers> & UseMenuListboxSlotEventHandlers
> & {
  ref: React.Ref<any>;
  role: React.AriaRole;
};

export interface MenuInternalState extends ListState<string> {
  open: boolean;
}
