import * as React from 'react';
import JoyUsageDemo from 'docs/src/modules/components/JoyUsageDemo';
import Box from '@mui/joy/Box';
import MenuButton from '@mui/joy/MenuButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListDivider from '@mui/joy/ListDivider';
import Dropdown from '@mui/joy/Dropdown';

export default function MenuUsage() {
  return (
    <JoyUsageDemo
      componentName="Menu"
      data={[
        {
          propName: 'variant',
          knob: 'radio',
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
          <Dropdown open={props.open}>
            <MenuButton
              slotProps={{
                root: {
                  variant: props.variant,
                  color: props.color,
                  size: props.size,
                  invertedColors: props.invertedColors,
                },
              }}
            >
              Format
            </MenuButton>
            <Menu
              id="menu-usage-demo"
              variant={props.variant}
              color={props.color}
              size={props.size}
              invertedColors={props.invertedColors}
            >
              <MenuItem>Add space before paragraph</MenuItem>
              <MenuItem>Add space after paragraph</MenuItem>
              <ListDivider />
              <MenuItem>Custom spacing...</MenuItem>
            </Menu>
          </Dropdown>
        </Box>
      )}
    />
  );
}
