import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Switch from '@mui/joy/Switch';

export default function SwitchJoy() {
  return (
    <CssVarsProvider>
      <Box sx={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(4, min-content)' }}>
        <Switch />
        <Switch defaultChecked />
        <Switch defaultChecked color="success" />
        <Switch variant="outlined" />
        <Switch variant="outlined" defaultChecked />
        <Switch variant="soft" />
        <Switch variant="soft" defaultChecked />
      </Box>
    </CssVarsProvider>
  );
}
