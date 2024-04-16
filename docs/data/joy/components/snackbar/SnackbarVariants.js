import * as React from 'react';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Snackbar from '@mui/joy/Snackbar';

export default function SnackbarVariants() {
  const [open, setOpen] = React.useState(false);
  const [variant, setVariant] = React.useState('outlined');
  return (
    <Stack spacing={2} direction="row">
      <Button
        variant="plain"
        color="neutral"
        onClick={() => {
          setOpen(true);
          setVariant('plain');
        }}
      >
        plain
      </Button>
      <Button
        variant="outlined"
        color="neutral"
        onClick={() => {
          setOpen(true);
          setVariant('outlined');
        }}
      >
        outlined
      </Button>
      <Button
        variant="soft"
        color="neutral"
        onClick={() => {
          setOpen(true);
          setVariant('soft');
        }}
      >
        soft
      </Button>
      <Button
        variant="solid"
        color="neutral"
        onClick={() => {
          setOpen(true);
          setVariant('solid');
        }}
      >
        solid
      </Button>
      <Snackbar
        autoHideDuration={3000}
        open={open}
        variant={variant}
        onClose={(event, reason) => {
          if (reason === 'clickaway') {
            return;
          }
          setOpen(false);
        }}
      >
        A snackbar with {variant} variant.
      </Snackbar>
    </Stack>
  );
}
