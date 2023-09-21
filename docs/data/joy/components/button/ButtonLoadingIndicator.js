import * as React from 'react';
import Stack from '@mui/joy/Stack';
import Button from '@mui/joy/Button';

export default function ButtonLoadingIndicator() {
  return (
    <Stack spacing={2} direction="row">
      <Button loading variant="outlined">
        Default
      </Button>
      <Button loading loadingIndicator="Loading…" variant="outlined">
        Custom
      </Button>
    </Stack>
  );
}
