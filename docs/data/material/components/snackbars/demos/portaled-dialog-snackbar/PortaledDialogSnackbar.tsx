import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import type { SnackbarCloseReason } from '@mui/material/Snackbar';

export default function PortaledDialogSnackbar() {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSnackbarOpen(false);
  };

  const handleSnackbarClose = (
    _event: React.SyntheticEvent | Event,
    reason: SnackbarCloseReason,
  ) => {
    if (reason !== 'clickaway') {
      setSnackbarOpen(false);
    }
  };

  return (
    <React.Fragment>
      <Button onClick={() => setDialogOpen(true)}>Open task dialog</Button>
      <Dialog
        open={dialogOpen}
        onClose={(_event, reason) => {
          if (reason === 'escapeKeyDown' && snackbarOpen) {
            setSnackbarOpen(false);
            return;
          }
          handleDialogClose();
        }}
        aria-labelledby="portaled-snackbar-dialog-title"
        aria-describedby="portaled-snackbar-dialog-description"
      >
        <DialogTitle id="portaled-snackbar-dialog-title">Save a task</DialogTitle>
        <DialogContent>
          <DialogContentText id="portaled-snackbar-dialog-description">
            Submit the task to show a confirmation while this dialog stays open.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Close</Button>
          <Button onClick={() => setSnackbarOpen(true)}>Submit task</Button>
        </DialogActions>
      </Dialog>
      {/* @focus-start */}
      <Snackbar
        disablePortal={false}
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message="Task saved successfully"
        action={
          <Button color="inherit" onClick={() => setSnackbarOpen(false)}>
            Dismiss
          </Button>
        }
      />
      {/* @focus-end */}
    </React.Fragment>
  );
}
