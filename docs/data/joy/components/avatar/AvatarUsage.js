import * as React from 'react';
import Box from '@mui/joy/Box';
import Avatar from '@mui/joy/Avatar';
import JoyUsageDemo from 'docs/src/modules/components/JoyUsageDemo';

export default function AvatarUsage() {
  return (
    <JoyUsageDemo
      componentName="Avatar"
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
          defaultValue: 'neutral',
        },
        {
          propName: 'size',
          knob: 'radio',
          options: ['sm', 'md', 'lg'],
          defaultValue: 'md',
        },
      ]}
      renderDemo={(props) => (
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Avatar src="/static/images/avatar/1.jpg" {...props} />
          <Avatar {...props}>M</Avatar>
          <Avatar {...props} />
        </Box>
      )}
    />
  );
}
