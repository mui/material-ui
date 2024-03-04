import * as React from 'react';
import Box from '@mui/joy/Box';
import MenuButton from '@mui/joy/MenuButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListDivider from '@mui/joy/ListDivider';
import Dropdown from '@mui/joy/Dropdown';
import JoyUsageDemo from 'docs/src/modules/components/JoyUsageDemo';

export default function MenuUsage() {
  return (
    <JoyUsageDemo
      componentName="Menu"
      data={[
        {
          propName: 'menuButtonVariant',
          knob: 'select',
          defaultValue: 'outlined',
          options: ['plain', 'outlined', 'soft', 'solid'],
        },
        {
          propName: 'menuVariant',
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
          defaultValue: '$children',
        },
      ]}
      getCodeBlock={(code, props) => {
        return `<Dropdown${props.open ? ` open` : ''}>
  <MenuButton${
    props.menuButtonVariant !== 'outlined'
      ? `
    variant="${props.menuButtonVariant}"`
      : ''
  }${
    props.color !== 'neutral'
      ? `
    color="${props.color}"`
      : ''
  }${
    props.size !== 'md'
      ? `
    size="${props.size}"`
      : ''
  }>
    Format
  </MenuButton>
  <Menu${
    props.invertedColors
      ? `
    invertedColors`
      : ''
  }${
    props.menuVariant !== 'outlined'
      ? `
    variant="${props.menuVariant}"`
      : ''
  }${
    props.color !== 'neutral'
      ? `
    color="${props.color}"`
      : ''
  }${
    props.size !== 'md'
      ? `
    size="${props.size}"`
      : ''
  }>
    <MenuItem>…</MenuItem>
    …
  </Menu>
</Dropdown>`;
      }}
      renderDemo={({
        menuButtonVariant,
        menuVariant,
        color,
        open,
        size,
        invertedColors,
      }) => (
        <Box sx={{ pb: 20 }}>
          <Dropdown open={open}>
            <MenuButton variant={menuButtonVariant} color={color} size={size}>
              Format
            </MenuButton>
            <Menu
              variant={menuVariant}
              color={color}
              size={size}
              invertedColors={invertedColors}
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
