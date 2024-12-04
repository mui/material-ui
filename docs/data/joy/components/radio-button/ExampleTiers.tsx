import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import RadioGroup from '@mui/joy/RadioGroup';
import Radio from '@mui/joy/Radio';
import Sheet from '@mui/joy/Sheet';

export default function ExampleTiers() {
  return (
    <Sheet variant="outlined" sx={{ boxShadow: 'sm', borderRadius: 'sm', p: 1 }}>
      <RadioGroup name="tiers" sx={{ gap: 1, '& > div': { p: 1 } }}>
        <FormControl size="sm">
          <Radio overlay value="small" label="Small" />
          <FormHelperText>
            For light background jobs like sending email
          </FormHelperText>
        </FormControl>
        <FormControl>
          <Radio overlay value="medium" label="Medium" />
          <FormHelperText>
            For tasks like image resizing, exporting PDFs, etc.
          </FormHelperText>
        </FormControl>
        <FormControl size="lg">
          <Radio overlay value="large" label="Large" />
          <FormHelperText>
            For intensive tasks like video encoding, etc.
          </FormHelperText>
        </FormControl>
      </RadioGroup>
    </Sheet>
  );
}
