import * as React from 'react';
import { MenuItemMetadata, MenuItemState } from '@mui/base/useMenu';

export interface MenuUnstyledContextType {
  registerItem: (id: string, metadata: MenuItemMetadata) => void;
  unregisterItem: (id: string) => void;
  getItemState: (id: string) => MenuItemState | undefined;
  getItemProps: (
    id: string,
    otherHandlers?: Record<string, React.EventHandler<any>>,
  ) => Record<string, any>;
  open: boolean;
}

const MenuUnstyledContext = React.createContext<MenuUnstyledContextType | null>(null);
MenuUnstyledContext.displayName = 'MenuUnstyledContext';

export default MenuUnstyledContext;
