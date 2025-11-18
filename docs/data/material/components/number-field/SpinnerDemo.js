import * as React from 'react';
import Box from '@mui/material/Box';
import NumberSpinner from './components/NumberSpinner';

export default function SpinnerDemo() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        justifyContent: 'center',
      }}
    >
      <NumberSpinner label="Number Spinner" min={10} max={40} />
      <NumberSpinner
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
