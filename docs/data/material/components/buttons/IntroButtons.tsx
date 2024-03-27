import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import Stack from '@mui/material/Stack';

export default function IntroButtons() {
  return (
    <Stack direction="row" spacing={2}>
      <Button disabled>Go back</Button>
      <Button
        variant="outlined"
        startIcon={<DeleteIcon />}
        color="error"
        onClick={() => {
          alert('Canceled.');
        }}
      >
        Cancel
      </Button>
      <Button
        variant="contained"
        startIcon={<CheckIcon />}
        onClick={() => {
          alert('Confirmed.');
        }}
      >
        Confirm
      </Button>
    </Stack>
  );
}
