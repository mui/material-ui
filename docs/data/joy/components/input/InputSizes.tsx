import * as React from 'react';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';

export default function InputSizes() {
  return (
    <Stack spacing={2}>
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium" />
      <Input size="lg" placeholder="Large" />
    </Stack>
  );
}
