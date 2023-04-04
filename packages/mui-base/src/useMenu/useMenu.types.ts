import * as React from 'react';
import { ListAction, ListState, UseListRootSlotProps } from '../useList';
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
   * Action dispatcher for the menu component.
   * Allows to programmatically control the menu.
   */
  dispatch: (action: ListAction<string, MenuInternalState>) => void;
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
