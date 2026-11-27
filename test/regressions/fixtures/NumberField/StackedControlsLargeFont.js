import * as React from 'react';
import Box from '@mui/material/Box';
import GlobalStyles from '@mui/material/GlobalStyles';
import NumberField from '@mui/material/NumberField';
import TextField from '@mui/material/TextField';

export default function StackedControlsLargeFont() {
  return (
    <Box
      sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 240px)', alignItems: 'start', gap: 2 }}
    >
      <GlobalStyles styles={{ html: { fontSize: '20px' } }} />
      {['outlined', 'filled', 'standard'].map((variant) => (
        <React.Fragment key={variant}>
          <TextField variant={variant} label="Reference" defaultValue="5" />
          <NumberField
            variant={variant}
            label="Quantity"
            defaultValue={5}
            controlsPosition="stacked"
          />
        </React.Fragment>
      ))}
    </Box>
  );
}
