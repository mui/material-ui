import * as React from 'react';
import JoyUsageDemo from 'docs/src/modules/components/JoyUsageDemo';
import Typography from '@mui/joy/Typography';
import { Box } from '@mui/joy';

export default function TypographyUsages() {
  return (
    <JoyUsageDemo
      componentName="Typography"
      data={[
        {
          propName: 'level',
          knob: 'select',
          defaultValue: 'h1',
          options: [
            'display1',
            'display2',
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'h6',
            'body1',
            'body2',
            'body3',
          ],
        },

        {
          propName: 'color',
          knob: 'color',
          defaultValue: 'neutral',
        },

        {
          propName: 'variant',
          knob: 'radio',
          defaultValue: 'plain',
          options: ['plain', 'outlined', 'soft', 'solid'],
        },

        {
          propName: 'children',
          knob: 'input',
          defaultValue: 'Typography',
        },

        {
          propName: 'noWrap',
          knob: 'switch',
          defaultValue: false,
        },
      ]}
      renderDemo={(props) => (
        <Box sx={{ maxWidth: '400px' }}>
          <Typography {...props}>{props.children}</Typography>
        </Box>
      )}
    />
  );
}
