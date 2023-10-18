import * as React from 'react';
import Checkbox from '@mui/joy/Checkbox';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';

export default function HelperTextCheckbox() {
  return (
    <FormControl>
      <Checkbox label="Label" />
      <FormHelperText>A description for the Checkbox.</FormHelperText>
    </FormControl>
  );
}
