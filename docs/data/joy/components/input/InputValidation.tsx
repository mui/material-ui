import * as React from 'react';
import Input from '@mui/joy/Input';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Stack from '@mui/joy/Stack';
import InfoOutlined from '@mui/icons-material/InfoOutlined';

export default function InputValidation() {
  return (
    <Stack spacing={2}>
      <Input placeholder="Type in here…" error defaultValue="Oh no, error found!" />
      <FormControl error>
        <FormLabel>Label</FormLabel>
        <Input placeholder="Type in here…" defaultValue="Oh no, error found!" />
        <FormHelperText>
          <InfoOutlined />
          Opps! something is wrong.
        </FormHelperText>
      </FormControl>
    </Stack>
  );
}
