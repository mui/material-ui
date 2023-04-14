import * as React from 'react';
import { ListAction, ListState, UseListRootSlotProps } from '../useList';
import { MenuItemMetadata } from '../useMenuItem';
import { EventHandlers } from '../utils/types';
import { MenuProviderValue } from './MenuProvider';

export interface UseMenuParameters {
  /**
   * If `true`, the menu will be initially open.
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * If `true`, the menu will be open.
   * This is the controlled equivalent of the `defaultOpen` parameter.
   */
  open?: boolean;
  /**
   * Callback fired when the menu is opened or closed.
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Id of the menu listbox.
   */
  listboxId?: string;
  /**
   * Ref of the menu listbox.
   */
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
  dispatch: (action: ListAction<string>) => void;
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
  highlightedValue: string | null;
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
  /**
   * If `true`, the menu is open.
   */
  open: boolean;
}
