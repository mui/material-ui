import * as React from 'react';
import Button from '@mui/joy/Button';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import Apps from '@mui/icons-material/Apps';

export default function SelectedMenu() {
  const [selectedIndex, setSelectedIndex] = React.useState<number>(1);
  const buttonRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);

  const createHandleClose = (index: number) => () => {
    setOpen(false);
    if (typeof index === 'number') {
      setSelectedIndex(index);
    }
  };
  const createHandleClose =
    (index: number) =>
    (event: React.MouseEvent<Element, Event> | React.FocusEvent | null) => {
      if (event && event.relatedTarget !== anchorEl) {
        setAnchorEl(null);
      }
      if (typeof index === 'number') {
        setSelectedIndex(index);
      }
    };

  return (
    <div>
      <Button
        ref={buttonRef}
        id="selected-demo-button"
        aria-controls={'selected-demo-menu'}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="outlined"
        color="neutral"
        onClick={() => {
          if (!open) {
            setOpen(true);
          }
        }}
        startDecorator={<Apps />}
      >
        Apps
      </Button>
      <Menu
        id="selected-demo-menu"
        anchorEl={buttonRef.current}
        open={open}
        onClose={createHandleClose(-1)}
        aria-labelledby="selected-demo-button"
      >
        <MenuItem
          {...(selectedIndex === 0 && { selected: true, variant: 'soft' })}
          onClick={createHandleClose(0)}
        >
          Random project
        </MenuItem>
        <MenuItem
          {...(selectedIndex === 1 && { selected: true, variant: 'soft' })}
          onClick={createHandleClose(1)}
        >
          Production - web
        </MenuItem>
        <MenuItem
          {...(selectedIndex === 2 && { selected: true, variant: 'soft' })}
          onClick={createHandleClose(2)}
        >
          Staging - web
        </MenuItem>
      </Menu>
    </div>
  );
}
