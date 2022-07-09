import * as React from 'react';
import { MenuUnstyledActions } from '@mui/base/MenuUnstyled';
import { PopperUnstyledProps } from '@mui/base/PopperUnstyled';

const MenuButtonContext = React.createContext<
  | undefined
  | {
      actions: React.Ref<MenuUnstyledActions>;
      anchorEl: PopperUnstyledProps['anchorEl'];
      open: boolean;
      menuId: string | undefined;
      onClose: () => void;
    }
>(undefined);

export default MenuButtonContext;
