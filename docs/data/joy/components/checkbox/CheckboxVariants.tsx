import * as React from 'react';
import Box from '@mui/joy/Box';
import Checkbox from '@mui/joy/Checkbox';

export default function CheckboxVariants() {
  return (
    <Box sx={{ display: 'flex', gap: 3 }}>
      <Checkbox label="Solid" variant="solid" defaultChecked />
      <Checkbox label="Soft" variant="soft" defaultChecked />
      <Checkbox label="Outlined" variant="outlined" defaultChecked />
      <Checkbox label="Plain" variant="plain" defaultChecked />
    </Box>
  );
}
