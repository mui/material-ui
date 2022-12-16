import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Textarea from '@mui/joy/Textarea';

export default function TextareaField() {
  return (
    <FormControl>
      <FormLabel>Label</FormLabel>
      <Textarea placeholder="Placeholder" minRows={2} />
      <FormHelperText>This is a helper text.</FormHelperText>
    </FormControl>
  );
}
