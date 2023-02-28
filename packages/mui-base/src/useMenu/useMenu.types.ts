import * as React from 'react';
import { MenuUnstyledContextType } from '../MenuUnstyled/MenuUnstyledContext';
import { UseListboxRootSlotProps } from '../useListbox';
import { EventHandlers } from '../utils/types';
import { MenuItemMetadata } from './menuItem.types';

export interface UseMenuParameters {
  open?: boolean;
  onClose?: () => void;
  listboxId?: string;
  listboxRef?: React.Ref<any>;
}

export interface UseMenuReturnValue {
  /**
   * The value for the menu context.
   */
  contextValue: MenuUnstyledContextType;
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
  menuItems: Record<string, MenuItemMetadata>;
}

interface UseMenuListboxSlotEventHandlers {
  onBlur: React.FocusEventHandler;
  onKeyDown: React.KeyboardEventHandler;
}

export type UseMenuListboxSlotProps<TOther = {}> = UseListboxRootSlotProps<
  Omit<TOther, keyof UseMenuListboxSlotEventHandlers> & UseMenuListboxSlotEventHandlers
> & {
  ref: React.Ref<any>;
  role: React.AriaRole;
};
