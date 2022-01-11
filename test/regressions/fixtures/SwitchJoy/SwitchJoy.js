import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Switch from '@mui/joy/Switch';

export default function SwitchJoy() {
  return (
    <CssVarsProvider>
      <Box sx={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(4, min-content)' }}>
        {['primary', 'danger', 'info', 'success', 'warning'].map((color) => (
          <Switch key={color} color={color} />
        ))}
        {['sm', 'md', 'lg'].map((size) => (
          <Switch key={size} size={size} />
        ))}
      </Box>
    </CssVarsProvider>
  );
}
