import * as React from 'react';
import { Menu } from '@mui/base/Menu';
import { MenuItem } from '@mui/base/MenuItem';
import { MenuButton, MenuButtonRootSlotProps } from '@mui/base/MenuButton';
import { Dropdown } from '@mui/base/Dropdown';
import IconButton from '@mui/joy/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { CssVarsProvider } from '@mui/joy';

function WithRenderProp() {
  return (
    <Dropdown>
      <MenuButton
        renderRoot={(props) => (
          <IconButton data-testid="hamburger-menu" {...props}>
            <MenuIcon />
          </IconButton>
        )}
      />
      <Menu>
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </Dropdown>
  );
}

function WithSlotsAndSlotProps() {
  return (
    <Dropdown>
      <MenuButton
        slots={{
          root: IconButton,
        }}
        slotProps={{
          root: {
            'data-testid': 'hamburger-menu',
          } as any, // data attributes are not accepted by slotProps
        }}
      >
        <MenuIcon />
      </MenuButton>
      <Menu>
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </Dropdown>
  );
}

function MenuIconButton(props: MenuButtonRootSlotProps) {
  return (
    <IconButton data-testid="hamburger-menu" {...props}>
      {props.children}
    </IconButton>
  );
}

function WithSlots() {
  return (
    <Dropdown>
      <MenuButton
        slots={{
          root: MenuIconButton,
        }}
      >
        <MenuIcon />
      </MenuButton>
      <Menu>
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </Dropdown>
  );
}

export default function RenderProps() {
  return (
    <CssVarsProvider>
      <WithRenderProp />
      <WithSlotsAndSlotProps />
      <WithSlots />
    </CssVarsProvider>
  );
}
