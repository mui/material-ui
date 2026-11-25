import * as React from 'react';
import Box from '@mui/material/Box';
import NumberField from '@mui/material/NumberField';
import TextField from '@mui/material/TextField';

const cases = {
  small: { size: 'small' },
  medium: { size: 'medium' },
  compact: { size: 'small', hiddenLabel: true },
};

export default function UnlabeledFilledNumberField() {
  return (
    <Box
      sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 200px)', alignItems: 'start', gap: 2 }}
    >
      {Object.entries(cases).map(([name, props]) => (
        <React.Fragment key={name}>
          <TextField
            variant="filled"
            defaultValue="5"
            slotProps={{ htmlInput: { 'aria-label': 'Reference' } }}
            {...props}
          />
          <NumberField
            variant="filled"
            defaultValue={5}
            slotProps={{ htmlInput: { 'aria-label': 'Quantity' } }}
            {...props}
          />
        </React.Fragment>
      ))}
    </Box>
  );
}
