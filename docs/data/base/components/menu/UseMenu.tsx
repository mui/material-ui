import * as React from 'react';
import {
  useMenu,
  MenuUnstyledContext,
  MenuUnstyledContextType,
} from '@mui/base/MenuUnstyled';
import { useMenuItem } from '@mui/base/MenuItemUnstyled';

const Menu = React.forwardRef(function Menu(
  props: React.ComponentPropsWithoutRef<'ul'>,
  ref: React.Ref<HTMLUListElement>,
) {
  const { children, ...other } = props;

  const { registerItem, unregisterItem, getRootProps, getItemProps, getItemState } =
    useMenu({
      listboxRef: ref,
    });

  const contextValue: MenuUnstyledContextType = {
    registerItem,
    unregisterItem,
    getItemState,
    getItemProps,
  };

  return (
    <ul {...other} {...getRootProps()}>
      <MenuUnstyledContext.Provider value={contextValue}>
        {children}
      </MenuUnstyledContext.Provider>
    </ul>
  );
});

const MenuItem = React.forwardRef(function MenuItem(
  props: React.ComponentPropsWithoutRef<'li'>,
  ref: React.Ref<any>,
) {
  const { children, ...other } = props;

  const { getRootProps, itemState } = useMenuItem({
    component: 'li',
    ref,
  });

  if (itemState == null) {
    return null;
  }

  return (
    <li {...other} {...getRootProps()}>
      {children}
    </li>
  );
});

export default function UseMenu() {
  return (
    <Menu>
      <MenuItem>Cut</MenuItem>
      <MenuItem>Copy</MenuItem>
      <MenuItem>Paste</MenuItem>
    </Menu>
  );
}
