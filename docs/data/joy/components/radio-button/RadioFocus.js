import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Radio, { radioClasses } from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';

export default function RadioFocus() {
  return (
    <FormControl>
      <FormLabel>Focus</FormLabel>
      <RadioGroup name="radio-buttons-group-focus">
        <Radio value="default" label="Default" />
        <Radio
          value="relative"
          label="Position relative"
          sx={{ [`& .${radioClasses.radio}`]: { position: 'relative' } }}
        />
      </RadioGroup>
      <FormHelperText>
        Select an option and use keyboard ↑↓ to see the focus outline
      </FormHelperText>
    </FormControl>
  );
}
