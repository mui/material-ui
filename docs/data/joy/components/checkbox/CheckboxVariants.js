import * as React from 'react';
import Box from '@mui/joy/Box';
import Checkbox from '@mui/joy/Checkbox';

export default function CheckboxVariants() {
  return (
    <Box sx={{ display: 'flex', gap: 3 }}>
      <Checkbox label="Solid" variant="solid" />
      <Checkbox label="Soft" variant="soft" />
      <Checkbox label="Outlined" variant="outlined" />
      <Checkbox label="Plain" variant="plain" />
    </Box>
  );
}
