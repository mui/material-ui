import * as React from 'react';
import { ListAction, ListState, UseListRootSlotProps } from '../useList';
import { MenuItemMetadata } from '../useMenuItem';
import { MenuProviderValue } from './MenuProvider';

export interface UseMenuParameters {
  /**
   * If `true` (Default) will focus the highligted item. If you set this prop to `false`
   * the focus will not be moved inside the Menu component. This has severe accessibility implications
   * and should only be considered if you manage focus otherwise.
   * @default true
   */
  autoFocus?: boolean;
  /**
   * The id of the menu. If not provided, it will be generated.
   */
  id?: string;
  /**
   * If `true`, it will be possible to highlight disabled items.
   * @default true
   */
  disabledItemsFocusable?: boolean;
  /**
   * If `true`, the highlight will not wrap around the list if arrow keys are used.
   * @default false
   */
  disableListWrap?: boolean;
  /**
   * Callback fired when the menu items change.
   */
  onItemsChange?: (items: string[]) => void;
  /**
   * The ref to the menu's listbox node.
   */
  listboxRef?: React.Ref<Element>;
  /**
   * The name of the component using useMenu.
   * For debugging purposes.
   * @default 'useMenu'
   */
  componentName?: string;
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
   * @param externalProps additional props for the listbox component
   * @returns props that should be spread on the listbox component
   */
  getListboxProps: <ExternalProps extends Record<string, unknown> = {}>(
    externalProps?: ExternalProps,
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

export type UseMenuListboxSlotProps<ExternalProps = {}> = UseListRootSlotProps<
  Omit<ExternalProps, keyof UseMenuListboxSlotEventHandlers> & UseMenuListboxSlotEventHandlers
> & {
  ref: React.RefCallback<Element> | null;
  role: React.AriaRole;
};

export interface MenuInternalState extends ListState<string> {}
