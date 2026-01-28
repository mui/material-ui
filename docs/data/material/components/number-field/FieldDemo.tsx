import * as React from 'react';
import Box from '@mui/material/Box';
import NumberField from './components/NumberField';

export default function FieldDemo() {
  return (
    <Box sx={{ display: 'grid', gap: 4 }}>
      <NumberField label="Number Field" min={10} max={40} />
      <NumberField
        label="Small and Error"
        min={10}
        max={40}
        size="small"
        defaultValue={100}
        error
      />
    </Box>
  );
}
