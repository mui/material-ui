import * as React from 'react';
import Box from '@mui/joy/Box';
import Badge from '@mui/joy/Badge';
import JoyUsageDemo from 'docs/src/modules/components/JoyUsageDemo';

export default function BadgeUsage() {
  return (
    <JoyUsageDemo
      componentName="Badge"
      data={[
        {
          propName: 'variant',
          knob: 'radio',
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
          propName: 'badgeContent',
          knob: 'input',
        },
      ]}
      renderDemo={(props) => (
        <Badge {...props}>
          <Box
            sx={{
              bgcolor: 'background.level3',
              borderRadius: 'xs',
              width: 48,
              height: 48,
            }}
          />
        </Badge>
      )}
    />
  );
}
