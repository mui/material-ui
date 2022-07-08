import * as React from 'react';
import JoyUsageDemo from 'docs/src/modules/components/JoyUsageDemo';
import Box from '@mui/joy/Box';
import TextField from '@mui/joy/TextField';

export default function ButtonUsage() {
  return (
    <JoyUsageDemo
      componentName="TextField"
      data={[
        {
          propName: 'variant',
          knob: 'select',
          defaultValue: 'solid',
          options: ['plain', 'outlined', 'soft', 'solid'],
        },
        {
          propName: 'size',
          knob: 'radio',
          options: ['sm', 'md', 'lg'],
          defaultValue: 'md',
        },
        {
          propName: 'label',
          knob: 'input',
          defaultValue: 'Label',
        },
        {
          propName: 'placeholder',
          knob: 'input',
          defaultValue: 'placeholder',
        },
        {
          propName: 'disabled',
          knob: 'switch',
          defaultValue: false,
        },
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
