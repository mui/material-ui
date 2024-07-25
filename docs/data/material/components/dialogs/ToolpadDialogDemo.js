import * as React from 'react';
import PropTypes from 'prop-types';
import { DialogsProvider, useDialogs } from '@toolpad/core/useDialogs';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

function MyCustomDialog({ open, onClose }) {
  return (
    <Dialog fullWidth open={open} onClose={() => onClose()}>
      <DialogTitle>Custom dialog</DialogTitle>
      <DialogContent>I am a custom dialog</DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()}>Close me</Button>
      </DialogActions>
    </Dialog>
  );
}

MyCustomDialog.propTypes = {
  /**
   * A function to call when the dialog should be closed. If the dialog has a return
   * value, it should be passed as an argument to this function. You should use the promise
   * that is returned to show a loading state while the dialog is performing async actions
   * on close.
   * @param result The result to return from the dialog.
   * @returns A promise that resolves when the dialog can be fully closed.
   */
  onClose: PropTypes.func.isRequired,
  /**
   * Whether the dialog is open.
   */
  open: PropTypes.bool.isRequired,
};

function DemoContent() {
  const dialogs = useDialogs();
  return (
    <div>
      <Button
        onClick={async () => {
          // preview-start
          await dialogs.open(MyCustomDialog);
          // preview-end
        }}
      >
        Open custom
      </Button>
    </div>
  );
}

export default function ToolpadDialogDemo() {
  return (
    <DialogsProvider>
      <DemoContent />
    </DialogsProvider>
  );
}
