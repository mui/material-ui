import * as React from 'react';
import PropTypes from 'prop-types';
import { useMenu, MenuUnstyledContext } from '@mui/base/MenuUnstyled';
import { useMenuItem } from '@mui/base/MenuItemUnstyled';

const Menu = React.forwardRef(function Menu(props, ref) {
  const { children, ...other } = props;

  const { registerItem, unregisterItem, getRootProps, getItemProps, getItemState } =
    useMenu({
      listboxRef: ref,
    });

  const contextValue = {
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

Menu.propTypes = {
  children: PropTypes.node,
};

const MenuItem = React.forwardRef(function MenuItem(props, ref) {
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

MenuItem.propTypes = {
  children: PropTypes.node,
};

export default function UseMenu() {
  return (
    <Menu>
      <MenuItem>Cut</MenuItem>
      <MenuItem>Copy</MenuItem>
      <MenuItem>Paste</MenuItem>
    </Menu>
  );
}
