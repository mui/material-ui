import * as React from 'react';
import Stack from '@mui/joy/Stack';
import CircularProgress from '@mui/joy/CircularProgress';
import Button from '@mui/joy/Button';

export default function ButtonLoadingIndicator() {
  return (
    <Stack spacing={2} direction="row">
      <Button loading endDecorator={<CircularProgress />} variant="solid">
        Send
      </Button>
      <Button loading loadingIndicator="Loading…" variant="outlined">
        Fetch data
      </Button>
    </Stack>
  );
}
