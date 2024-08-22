import * as React from 'react';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import Stack from '@mui/material/Stack';

export default function LoadingButtons() {
  return (
    <Stack direction="row" spacing={2}>
      <Button loading variant="outlined">
        Submit
      </Button>
      <Button loading loadingIndicator="Loading…" variant="outlined">
        Fetch data
      </Button>
      <Button
        loading
        loadingPosition="start"
        startIcon={<SaveIcon />}
        variant="outlined"
      >
        Save
      </Button>
    </Stack>
  );
}
