import * as React from 'react';
import JoyUsageDemo from 'docs/src/modules/components/JoyUsageDemo';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';

export default function ButtonUsage() {
  return (
    <JoyUsageDemo
      componentName="Button"
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
        { propName: 'onClick', defaultValue: () => {} },
      ]}
      renderDemo={(props) => (
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button {...props}>Hello world</Button>
          <IconButton {...props}>
            <FavoriteBorder />
          </IconButton>
        </Box>
      )}
    />
  );
}
