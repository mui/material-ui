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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    buttonRef.current?.focus();
  };

  const handleButtonKeyDown = (event) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      setAnchorEl(event.currentTarget);
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
            aria-controls={open ? 'menu-usage-demo' : undefined}
            aria-haspopup="menu"
            aria-expanded={open ? 'true' : undefined}
            variant="outlined"
            color="neutral"
            onClick={handleClick}
            onKeyDown={handleButtonKeyDown}
          >
            Format
          </Button>
          <Menu
            {...props}
            id="menu-usage-demo"
            anchorEl={anchorEl}
            open={open}
            {...(typeof props.open === 'boolean' && {
              open: props.open,
              anchorEl: buttonRef.current,
            })}
            onClose={handleClose}
            slotProps={{
              listbox: {
                'aria-labelledby': 'menu-usage-button',
              },
            }}
          >
            <MenuItem onClick={handleClose}>Add space before paragraph</MenuItem>
            <MenuItem onClick={handleClose}>Add space after paragraph</MenuItem>
            <ListDivider />
            <MenuItem onClick={handleClose}>Custom spacing...</MenuItem>
          </Menu>
        </Box>
      )}
    />
  );
}
