import * as React from 'react';
import { MenuAction, MenuOpenState } from '../useDropdownMenu/useDropdownMenu.types';

export interface MenuContextValue {
  dispatch: React.Dispatch<MenuAction>;
  popupId: string;
  registerPopup: (popupId: string) => void;
  registerTrigger: (element: HTMLElement | null) => void;
  state: MenuOpenState;
  triggerElement: HTMLElement | null;
}

const MenuContext = React.createContext<MenuContextValue | null>(null);

export default MenuContext;
