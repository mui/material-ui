import * as React from 'react';

const MenuPopupContext = React.createContext<{ open?: boolean; onClose?: () => void }>({
  open: undefined,
  onClose: undefined,
});

export const useMenuPopup = () => React.useContext(MenuPopupContext);

export default MenuPopupContext;
