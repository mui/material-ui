import * as React from 'react';
import Stack from '@mui/joy/Stack';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/joy/Button';

export default function ButtonLoading() {
  return (
    <Stack spacing={2} direction="row">
      <Button loading endDecorator={<SendIcon />} variant="solid">
        Send
      </Button>
      <Button loading loadingIndicator="Loading…" variant="outlined">
        Fetch data
      </Button>
    </Stack>
  );
}
