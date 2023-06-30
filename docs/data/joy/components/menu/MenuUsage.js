import * as React from 'react';
import JoyUsageDemo from 'docs/src/modules/components/JoyUsageDemo';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListDivider from '@mui/joy/ListDivider';

export default function MenuUsage() {
  const buttonRef = React.useRef(null);
  const menuActions = React.useRef(null);
  const [open, setOpen] = React.useState(false);

  const handleButtonKeyDown = (event) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      setOpen(true);
      if (event.key === 'ArrowUp') {
        menuActions.current?.highlightLastItem();
      }
    }
  };

  return (
    <JoyUsageDemo
      componentName="Menu"
      data={[
        {
          propName: 'variant',
          knob: 'select',
          defaultValue: 'outlined',
          options: ['plain', 'outlined', 'soft', 'solid'],
        },
        {
          propName: 'color',
          knob: 'color',
          defaultValue: 'neutral',
        },
        {
          propName: 'size',
          knob: 'radio',
          options: ['sm', 'md', 'lg'],
          defaultValue: 'md',
        },
        {
          propName: 'open',
          knob: 'controlled',
        },
        {
          propName: 'invertedColors',
          knob: 'switch',
        },
        {
          propName: 'children',
          defaultValue: '<MenuItem>...</MenuItem>',
        },
      ]}
      renderDemo={(props) => (
        <Box sx={{ pb: 20 }}>
          <Button
            ref={buttonRef}
            id="menu-usage-button"
            aria-controls="menu-usage-demo"
            aria-haspopup="menu"
            aria-expanded={open ? 'true' : undefined}
            variant="outlined"
            color="neutral"
            onClick={() => {
              setOpen(!open);
            }}
            onKeyDown={handleButtonKeyDown}
          >
            Format
          </Button>
          <Menu
            {...props}
            id="menu-usage-demo"
            anchorEl={buttonRef.current}
            open={open}
            onClose={() => setOpen(false)}
            slotProps={{
              listbox: {
                'aria-labelledby': 'menu-usage-button',
              },
            }}
          >
            <MenuItem
              variant={props.variant === 'solid' ? 'solid' : undefined}
              onClick={() => setOpen(false)}
            >
              Add space before paragraph
            </MenuItem>
            <MenuItem
              variant={props.variant === 'solid' ? 'solid' : undefined}
              onClick={() => setOpen(false)}
            >
              Add space after paragraph
            </MenuItem>
            <ListDivider />
            <MenuItem
              variant={props.variant === 'solid' ? 'solid' : undefined}
              onClick={() => setOpen(false)}
            >
              Custom spacing...
            </MenuItem>
          </Menu>
        </Box>
      )}
    />
  );
}
