import * as React from 'react';
import Switch from '@mui/joy/Switch';
import DarkMode from '@mui/icons-material/DarkMode';

export default function ExampleThumbChild() {
  return (
    <Switch
      slotProps={{
        input: { 'aria-label': 'Dark mode' },
        thumb: {
          children: <DarkMode />,
        },
      }}
      sx={{
        '--Switch-thumbSize': '28px',
      }}
    />
  );
}
