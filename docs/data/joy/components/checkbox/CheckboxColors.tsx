import * as React from 'react';
import Box from '@mui/joy/Box';
import Checkbox from '@mui/joy/Checkbox';

export default function CheckboxColors() {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
      <Checkbox label="Primary" color="primary" defaultChecked />
      <Checkbox label="Neutral" color="neutral" defaultChecked />
      <Checkbox label="Danger" color="danger" defaultChecked />
      <Checkbox label="Success" color="success" defaultChecked />
      <Checkbox label="Warning" color="warning" defaultChecked />
    </Box>
  );
}
