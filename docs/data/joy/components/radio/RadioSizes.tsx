import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';

export default function RadioSizes() {
  return (
    <FormControl>
      <FormLabel>Sizes</FormLabel>
      <RadioGroup defaultValue="medium" name="radio-buttons-group">
        <Radio value="small" label="Small" size="sm" />
        <Radio value="medium" label="Medium" size="md" />
        <Radio value="large" label="Large" size="lg" />
      </RadioGroup>
    </FormControl>
  );
}
