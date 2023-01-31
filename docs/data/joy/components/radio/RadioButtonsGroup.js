import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';

export default function RadioButtonsGroup() {
  return (
    <FormControl>
      <FormLabel>Gender</FormLabel>
      <RadioGroup defaultValue="female" name="radio-buttons-group" sx={{ my: 1 }}>
        <Radio value="female" label="Female" />
        <Radio value="male" label="Male" />
        <Radio value="other" label="Other" />
      </RadioGroup>
      <FormHelperText>This is a helper text.</FormHelperText>
    </FormControl>
  );
}
