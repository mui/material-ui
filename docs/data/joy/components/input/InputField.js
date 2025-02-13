import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';

export default function InputField() {
  return (
    <FormControl>
      <FormLabel>Label</FormLabel>
      <Input placeholder="Placeholder" />
      <FormHelperText>This is a helper text.</FormHelperText>
    </FormControl>
  );
}
