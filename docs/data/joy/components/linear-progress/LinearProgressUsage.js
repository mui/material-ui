import * as React from 'react';
import LinearProgress from '@mui/joy/LinearProgress';
import Box from '@mui/joy/Box';
import JoyUsageDemo from 'docs/src/modules/components/JoyUsageDemo';

export default function LinearProgressUsage() {
  return (
    <JoyUsageDemo
      componentName="LinearProgress"
      data={[
        {
          propName: 'variant',
          knob: 'radio',
          defaultValue: 'soft',
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
          propName: 'determinate',
          knob: 'switch',
          defaultValue: false,
        },
        {
          propName: 'value',
          knob: 'number',
          defaultValue: 25,
        },
      ]}
      renderDemo={(props) => (
        <Box sx={{ width: 300 }}>
          <LinearProgress {...props} />
        </Box>
      )}
    />
  );
}
