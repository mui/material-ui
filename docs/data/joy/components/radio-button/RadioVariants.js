import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';

export default function RadioVariants() {
  return (
    <FormControl>
      <FormLabel>Variants</FormLabel>
      <RadioGroup defaultValue="outlined" name="radio-buttons-group">
        <Radio value="outlined" label="Outlined" variant="outlined" />
        <Radio value="soft" label="Soft" variant="soft" />
        <Radio value="solid" label="Solid" variant="solid" />
        <Radio value="plain" label="Plain" variant="plain" />
      </RadioGroup>
    </FormControl>
  );
}
