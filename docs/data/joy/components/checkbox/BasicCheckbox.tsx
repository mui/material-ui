import * as React from 'react';
import Box from '@mui/joy/Box';
import Checkbox from '@mui/joy/Checkbox';

export default function BasicCheckbox() {
  return (
    <Box sx={{ display: 'flex', gap: 3 }}>
      <Checkbox label="Label" />
      <Checkbox label="Label" defaultChecked />
    </Box>
  );
}
