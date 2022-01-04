import * as React from 'react';
import { OptionState } from '../ListboxUnstyled';
import { MenuItemMetadata } from './MenuUnstyledProps';

export interface MenuUnstyledContextType {
  registerItem: (id: string, metadata: MenuItemMetadata) => void;
  unregisterItem: (id: string) => void;
  getItemState: (id: string) => OptionState | undefined;
  getItemProps: (
    id: string,
    otherHandlers?: Record<string, React.EventHandler<any>>,
  ) => Record<string, any>;
}

const MenuUnstyledContext = React.createContext<MenuUnstyledContextType | null>(null);
MenuUnstyledContext.displayName = 'MenuUnstyledContext';

export default MenuUnstyledContext;
