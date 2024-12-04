import * as React from 'react';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Snackbar from '@mui/joy/Snackbar';

export default function SnackbarSizes() {
  const [open, setOpen] = React.useState(false);
  const [size, setSize] = React.useState('md');
  return (
    <Stack spacing={2} direction="row" sx={{ alignItems: 'center' }}>
      <Button
        variant="outlined"
        color="neutral"
        size="sm"
        onClick={() => {
          setOpen(true);
          setSize('sm');
        }}
      >
        sm
      </Button>
      <Button
        variant="outlined"
        color="neutral"
        size="md"
        onClick={() => {
          setOpen(true);
          setSize('md');
        }}
      >
        md
      </Button>
      <Button
        variant="outlined"
        color="neutral"
        size="lg"
        onClick={() => {
          setOpen(true);
          setSize('lg');
        }}
      >
        lg
      </Button>
      <Snackbar
        autoHideDuration={3000}
        open={open}
        size={size}
        onClose={(event, reason) => {
          if (reason === 'clickaway') {
            return;
          }
          setOpen(false);
        }}
      >
        A snackbar with {size} size.
      </Snackbar>
    </Stack>
  );
}
