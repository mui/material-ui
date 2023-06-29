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
            'h1',
            'h2',
            'h3',
            'h4',
            'title-lg',
            'title-md',
            'title-sm',
            'body-lg',
            'body-md',
            'body-sm',
            'body-xs',
          ],
        },

        {
          propName: 'color',
          knob: 'color',
          defaultValue: 'neutral',
        },

        {
          propName: 'variant',
          knob: 'select',
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
