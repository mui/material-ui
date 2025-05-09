import * as React from 'react';
import PropTypes from 'prop-types';
import { DialogsProvider, useDialogs } from '@toolpad/core/useDialogs';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Alert from '@mui/material/Alert';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

function MyCustomDialog({ open, onClose, payload }) {
  return (
    <Dialog fullWidth open={open} onClose={() => onClose()}>
      <DialogTitle>Custom Error Handler</DialogTitle>
      <DialogContent>
        <Alert severity="error">
          {`An error occurred while deleting item "${payload.id}":`}
          <pre>{payload.error}</pre>
        </Alert>
      </DialogContent>
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
  /**
   * The payload that was passed when the dialog was opened.
   */
  payload: PropTypes.shape({
    error: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
};

const mockApiDelete = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!id) {
        reject(new Error('ID is required'));
      } else if (parseInt(id, 10) % 2 === 0) {
        console.log('id', parseInt(id, 10));
        resolve(true);
      } else if (parseInt(id, 10) % 2 === 1) {
        reject(new Error('Can not delete odd numbered elements'));
      } else if (Number.isNaN(parseInt(id, 10))) {
        reject(new Error('ID must be a number'));
      } else {
        reject(new Error('Unknown error'));
      }
    }, 1000);
  });
};

function DemoContent() {
  const dialogs = useDialogs();
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDelete = async () => {
    const id = await dialogs.prompt('Enter the ID to delete', {
      okText: 'Delete',
      cancelText: 'Cancel',
    });

    if (id) {
      const deleteConfirmed = await dialogs.confirm(
        `Are you sure you want to delete "${id}"?`,
      );
      if (deleteConfirmed) {
        try {
          setIsDeleting(true);
          await mockApiDelete(id);
          dialogs.alert('Deleted!');
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Unknown error';
          await dialogs.open(MyCustomDialog, { id, error: message });
        } finally {
          setIsDeleting(false);
        }
      }
    }
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 16 }}>
        <Button variant="contained" loading={isDeleting} onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
}

export default function ToolpadDialogsNoSnap() {
  return (
    <DialogsProvider>
      <DemoContent />
    </DialogsProvider>
  );
}
