import * as React from 'react';
import Stack from '@mui/system/Stack';
import { Badge } from '@mui/base/Badge';
import { Button } from '@mui/base/Button';
import { Input } from '@mui/base/Input';
import { Menu } from '@mui/base/Menu';
import { MenuItem } from '@mui/base/MenuItem';
import { MenuButton } from '@mui/base/MenuButton';
import { Dropdown } from '@mui/base/Dropdown';
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';

export default function ComponentsGallery() {
  return (
    <Stack gap={2} style={{ padding: '8px' }}>
      <div>
        <Badge
          slotProps={{
            root: { className: 'GalleryBadge' },
            badge: { className: 'GalleryBadge--badge' },
          }}
          badgeContent={5}
        >
          <span className="GalleryBadge--content" />
        </Badge>
      </div>
      <div>
        <Button className="GalleryButton">Button</Button>
        <Button className="GalleryButton" disabled>
          Disabled
        </Button>
      </div>
      <div>
        <Input placeholder="Write your name here" className="GalleryInput" />
      </div>
      <div>
        <Dropdown>
          <MenuButton className="GalleryButton">My account</MenuButton>
          <Menu
            className="GalleryMenu"
            slotProps={{
              listbox: { className: 'GalleryMenu--listbox' },
            }}
          >
            <MenuItem className="GalleryMenu--item">Profile</MenuItem>
            <MenuItem className="GalleryMenu--item">Language settings</MenuItem>
            <MenuItem className="GalleryMenu--item">Log out</MenuItem>
          </Menu>
        </Dropdown>
      </div>
      <div style={{ maxWidth: '350px' }}>
        <NumberInput
          slotProps={{
            root: { className: 'GalleryNumberInput' },
            input: { className: 'input' },
            decrementButton: { className: 'btn decrement', children: '▾' },
            incrementButton: { className: 'btn increment', children: '▴' },
          }}
          aria-label="Demo number input"
          placeholder="Type a number…"
        />
      </div>
    </Stack>
  );
}
