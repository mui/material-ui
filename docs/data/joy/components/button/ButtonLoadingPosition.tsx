import * as React from 'react';
import Stack from '@mui/joy/Stack';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/joy/Button';

export default function ButtonLoadingPosition() {
  return (
    <Stack spacing={2} direction="row">
      <Button loading loadingPosition="start" variant="outlined">
        Start
      </Button>
      <Button
        loading
        loadingPosition="end"
        endDecorator={<SendIcon />}
        variant="outlined"
      >
        End
      </Button>
    </Stack>
  );
}
