import * as React from 'react';
import Stack from '@mui/system/Stack';
import { Badge } from '@mui/base/Badge';
import { Button } from '@mui/base/Button';
import { Input } from '@mui/base/Input';
import { Menu } from '@mui/base/Menu';
import { MenuItem } from '@mui/base/MenuItem';
import { MenuButton } from '@mui/base/MenuButton';
import { Dropdown } from '@mui/base/Dropdown';
import { Popper } from '@mui/base/Popper';
import { Unstable_Popup as Popup } from '@mui/base/Unstable_Popup';
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';

export default function ComponentsGallery() {
  // Popper demo
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  // Popup demo
  const [popupAnchor, setPopupAnchor] = React.useState<null | HTMLElement>(null);

  const popupButtonHandleClick = (event: React.MouseEvent<HTMLElement>) => {
    setPopupAnchor(popupAnchor ? null : event.currentTarget);
  };

  const popupOpen = Boolean(popupAnchor);
  const popupId = open ? 'simple-popup' : undefined;

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
      <div>
        <button type="button" aria-describedby={id} className="GalleryButton" onClick={handleClick}>
          Toggle Popper
        </button>
        <Popper id={id} open={open} anchorEl={anchorEl}>
          <div className="GalleryPopper">The content of the Popper.</div>
        </Popper>
      </div>
      <div>
        <button
          type="button"
          aria-describedby={id}
          className="GalleryButton"
          onClick={popupButtonHandleClick}
        >
          Toggle Popup
        </button>
        <Popup id={popupId} open={popupOpen} anchor={popupAnchor}>
          <div className="GalleryPopup">The content of the Popup.</div>
        </Popup>
      </div>
    </Stack>
  );
}
