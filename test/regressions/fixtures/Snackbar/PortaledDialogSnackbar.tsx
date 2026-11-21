import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';

export default function PortaledDialogSnackbar() {
  const [container, setContainer] = React.useState<HTMLDivElement | null>(null);

  return (
    <Box ref={setContainer} sx={{ width: '100vw', height: '100vh' }}>
      <Dialog
        open={container !== null}
        container={() => container}
        transitionDuration={0}
        aria-labelledby="notification-dialog-title"
        aria-describedby="notification-dialog-description"
      >
        <DialogTitle id="notification-dialog-title">Save a task</DialogTitle>
        <DialogContent>
          <DialogContentText id="notification-dialog-description">
            The task is saved and this dialog stays open.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button>Close</Button>
          <Button>Submit task</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        disablePortal={false}
        open
        transitionDuration={0}
        message="Task saved successfully"
        action={<Button color="inherit">Dismiss</Button>}
      />
    </Box>
  );
}
