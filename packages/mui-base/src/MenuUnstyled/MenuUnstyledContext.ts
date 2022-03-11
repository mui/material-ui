import * as React from 'react';
import { MenuItemMetadata, MenuItemState } from './useMenu.types';

export interface MenuUnstyledContextType {
  registerItem: (id: string, metadata: MenuItemMetadata) => void;
  unregisterItem: (id: string) => void;
  getItemState: (id: string) => MenuItemState | undefined;
  getItemProps: (
    id: string,
    otherHandlers?: Record<string, React.EventHandler<any>>,
  ) => Record<string, any>;
  getListboxProps: (otherHandlers?: Record<string, React.EventHandler<any>>) => {
    role: string;
    id?: string;
    ref: React.Ref<any>;
    tabIndex: number;
    'aria-activedescendant'?: string;
    onBlur: React.FocusEventHandler;
    onKeyDown: React.KeyboardEventHandler;
  };
  open: boolean;
}

const MenuUnstyledContext = React.createContext<MenuUnstyledContextType | null>(null);
MenuUnstyledContext.displayName = 'MenuUnstyledContext';

export default MenuUnstyledContext;
