import * as React from 'react';
import Snackbar from '@mui/joy/Snackbar';
import Button from '@mui/joy/Button';

export default function SnackbarInvertedColors() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return (
    <React.Fragment>
      <Button variant="outlined" color="neutral" onClick={handleOpen}>
        Show Snackbar
      </Button>
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={5000}
        variant="solid"
        invertedColors
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        I love snacks
      </Snackbar>
    </React.Fragment>
  );
}
