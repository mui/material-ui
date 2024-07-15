import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';

export default function RadioColors() {
  return (
    <FormControl>
      <FormLabel>Colors</FormLabel>
      <RadioGroup defaultValue="medium" name="radio-buttons-group">
        <Radio value="primary" label="Primary" color="primary" />
        <Radio value="neutral" label="Neutral" color="neutral" />
        <Radio value="danger" label="Danger" color="danger" />
        <Radio value="success" label="Success" color="success" />
        <Radio value="warning" label="Warning" color="warning" />
      </RadioGroup>
    </FormControl>
  );
}
