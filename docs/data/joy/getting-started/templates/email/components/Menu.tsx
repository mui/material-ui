import * as React from 'react';
import JoyMenu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';

function Menu({
  control,
  menus,
  id,
}: {
  control: React.ReactElement;
  id: string;
  menus: Array<{ label: string } & { [k: string]: any }>;
}) {
  return (
    <Dropdown>
      {control}
      <JoyMenu id={id} placement="bottom-end" sx={{ minWidth: 120 }}>
        {menus.map(({ label, active, ...item }) => {
          const menuItem = (
            <MenuItem
              selected={active}
              variant={active ? 'soft' : 'plain'}
              {...item}
            >
              {label}
            </MenuItem>
          );
          if (item.href) {
            return (
              <li key={label} role="none">
                {React.cloneElement(menuItem, { component: 'a' })}
              </li>
            );
          }
          return React.cloneElement(menuItem, { key: label });
        })}
      </JoyMenu>
    </Dropdown>
  );
}

export default Menu;
