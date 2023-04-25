import * as React from 'react';
import Popper from '@mui/base/Popper';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import { styled } from '@mui/joy/styles';
import Button from '@mui/joy/Button';
import MenuList from '@mui/joy/MenuList';
import MenuItem from '@mui/joy/MenuItem';

const Popup = styled(Popper)({
  zIndex: 1000,
});

export default function MenuListComposition(): JSX.Element {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleListKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Tab') {
      setAnchorEl(null);
    } else if (event.key === 'Escape') {
      anchorEl?.focus();
      setAnchorEl(null);
    }
  };

  return (
    <div>
      <Button
        id="composition-button"
        aria-controls={open ? 'composition-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="outlined"
        color="neutral"
        onClick={handleClick}
        sx={{ borderRadius: 0 }}
      >
        Open menu
      </Button>
      <Popup
        role={undefined}
        id="composition-menu"
        open={open}
        anchorEl={anchorEl}
        disablePortal
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, 4],
            },
          },
        ]}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <MenuList
            variant="outlined"
            onKeyDown={handleListKeyDown}
            sx={{ boxShadow: 'md', bgcolor: 'background.body' }}
          >
            <MenuItem onClick={handleClose}>Single</MenuItem>
            <MenuItem onClick={handleClose}>1.15</MenuItem>
            <MenuItem onClick={handleClose}>Double</MenuItem>
            <MenuItem onClick={handleClose}>Custom: 1.2</MenuItem>
          </MenuList>
        </ClickAwayListener>
      </Popup>
    </div>
  );
}
