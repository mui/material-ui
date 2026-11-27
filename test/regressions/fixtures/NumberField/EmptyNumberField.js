import * as React from 'react';
import NumberField from '@mui/material/NumberField';
import Stack from '@mui/material/Stack';

export default function EmptyNumberField() {
  return (
    <Stack spacing={2} sx={{ width: 240 }}>
      <NumberField label="Quantity" />
      <NumberField label="Quantity" controlsPosition="split" />
      <NumberField label="Quantity" scrubAreaPosition="start" />
    </Stack>
  );
}
