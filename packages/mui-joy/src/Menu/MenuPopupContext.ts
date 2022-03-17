import * as React from 'react';
import { MenuActions } from '../MenuList';

const MenuPopupContext = React.createContext<{
  id: string;
  actions?: React.RefObject<MenuActions>;
  open?: boolean;
  onClose?: () => void;
}>({
  id: '',
  actions: undefined,
  open: undefined,
  onClose: undefined,
});

export const useMenuPopup = () => React.useContext(MenuPopupContext);

export default MenuPopupContext;
