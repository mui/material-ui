import * as React from 'react';
import Box from '@mui/joy/Box';
import Checkbox from '@mui/joy/Checkbox';

export default function CheckboxSizes() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
      <Checkbox label="Small" size="sm" defaultChecked />
      <Checkbox label="Medium" size="md" defaultChecked />
      <Checkbox label="Large" size="lg" defaultChecked />
    </Box>
  );
}
