import * as React from 'react';
import JoyUsageDemo from 'docs/src/modules/components/JoyUsageDemo';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListDivider from '@mui/joy/ListDivider';

export default function MenuUsage() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <JoyUsageDemo
      componentName="Menu"
      data={[
        {
          propName: 'variant',
          knob: 'select',
          defaultValue: 'solid',
          options: ['plain', 'outlined', 'soft', 'solid'],
        },
        {
          propName: 'color',
          knob: 'color',
          defaultValue: 'primary',
        },
        {
          propName: 'size',
          knob: 'radio',
          options: ['sm', 'md', 'lg'],
          defaultValue: 'md',
        },
        {
          propName: 'disabled',
          knob: 'switch',
          defaultValue: false,
        },
      ]}
      renderDemo={(props) => (
        <Box>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            variant="outlined"
            color="neutral"
            onClick={handleClick}
          >
            Format
          </Button>
          <Menu
            id="basic-menu"
            size="sm"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            componentsProps={{
              listbox: {
                'aria-labelledby': 'basic-button',
              },
            }}
          >
            <MenuItem {...props} onClick={handleClose}>
              Add space before paragraph
            </MenuItem>
            <MenuItem onClick={handleClose}>Add space after paragraph</MenuItem>
            <ListDivider />
            <MenuItem onClick={handleClose}>Custom spacing...</MenuItem>
          </Menu>
        </Box>
      )}
    />
  );
}
