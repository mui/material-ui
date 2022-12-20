import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Radio from '@mui/joy/Radio';

export default function RadioButtonControl() {
  return (
    <FormControl sx={{ p: 2, flexDirection: 'row', gap: 2 }}>
      <Radio overlay defaultChecked />
      <div>
        <FormLabel>Selection title</FormLabel>
        <FormHelperText>One line description maximum lorem ipsum </FormHelperText>
      </div>
    </FormControl>
  );
}
