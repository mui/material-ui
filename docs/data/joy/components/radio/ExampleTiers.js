import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import RadioGroup from '@mui/joy/RadioGroup';
import Radio from '@mui/joy/Radio';
import Sheet from '@mui/joy/Sheet';

export default function ExampleTiers() {
  return (
    <Sheet
      variant="outlined"
      sx={{
        boxShadow: 'sm',
        borderRadius: 'sm',
        p: 1,
      }}
    >
      <RadioGroup
        name="tiers"
        sx={{ gap: 1, '& > div': { p: 1, flexDirection: 'row', gap: 2 } }}
      >
        <FormControl>
          <Radio overlay value="small" />
          <div>
            <FormLabel>Small</FormLabel>
            <FormHelperText>
              For light background jobs like sending email
            </FormHelperText>
          </div>
        </FormControl>
        <FormControl>
          <Radio overlay value="medium" />
          <div>
            <FormLabel>Medium</FormLabel>
            <FormHelperText>
              For tasks like image resizing, exporting PDFs, etc.
            </FormHelperText>
          </div>
        </FormControl>
        <FormControl>
          <Radio overlay value="large" />
          <div>
            <FormLabel>Large</FormLabel>
            <FormHelperText>
              For intensive tasks like video encoding, etc.
            </FormHelperText>
          </div>
        </FormControl>
      </RadioGroup>
    </Sheet>
  );
}
